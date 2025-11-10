import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './SplitText.css';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

const SplitText = ({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.8, 
  stagger = 0.05 
}: SplitTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    // Set initial state
    gsap.set(chars, {
      y: 100,
      opacity: 0,
      rotationX: -90,
      transformOrigin: '50% 50% -50px'
    });

    // Animate in
    gsap.to(chars, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'back.out(1.7)',
      onComplete: () => {
        // Add hover animations after initial animation
        chars.forEach((char) => {
          const element = char as HTMLElement;
          
          element.addEventListener('mouseenter', () => {
            gsap.to(element, {
              y: -10,
              scale: 1.2,
              color: '#16a34a',
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              y: 0,
              scale: 1,
              color: 'inherit',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }
    });

    return () => {
      gsap.killTweensOf(chars);
    };
  }, [text, delay, duration, stagger]);

  const splitTextIntoChars = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="char"
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={textRef} className={`split-text ${className}`}>
      {splitTextIntoChars(text)}
    </div>
  );
};

export default SplitText;