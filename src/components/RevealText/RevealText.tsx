import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import './RevealText.css';

interface RevealTextProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
  className?: string;
}

const RevealText: FC<RevealTextProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const directionClass = {
    up: 'reveal-up',
    left: 'reveal-left',
    right: 'reveal-right',
    fade: 'reveal-fade'
  }[direction];

  return (
    <div
      ref={ref}
      className={`reveal-text ${directionClass} ${isRevealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealText;
