import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
}

const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
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
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold]);

  const getRevealClass = () => {
    switch (direction) {
      case 'left':
        return 'scroll-reveal-left';
      case 'right':
        return 'scroll-reveal-right';
      case 'scale':
        return 'scroll-reveal-scale';
      default:
        return 'scroll-reveal';
    }
  };

  const getDelayClass = () => {
    if (delay > 0 && delay <= 6) {
      return `scroll-delay-${delay}`;
    }
    return '';
  };

  return (
    <div
      ref={ref}
      className={`${getRevealClass()} ${getDelayClass()} ${isRevealed ? 'revealed' : ''} ${className}`}
      style={delay > 6 ? { transitionDelay: `${delay * 0.1}s` } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
