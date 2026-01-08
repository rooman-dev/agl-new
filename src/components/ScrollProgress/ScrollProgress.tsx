import { FC, useState, useEffect } from 'react';
import './ScrollProgress.css';

const ScrollProgress: FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progressPercent = (scrolled / documentHeight) * 100;
      setProgress(Math.min(progressPercent, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
