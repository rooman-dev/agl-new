import { useState, useEffect, FC } from 'react';
import './TypeWriter.css';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypeWriter: FC<TypeWriterProps> = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    setHasStarted(false);

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, speed, hasStarted, isComplete, onComplete]);

  return (
    <span className={`typewriter ${className} ${isComplete ? 'complete' : ''}`}>
      {displayedText}
      {!isComplete && hasStarted && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

export default TypeWriter;
