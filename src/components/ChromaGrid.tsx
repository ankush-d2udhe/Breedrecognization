import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ChromaGridProps {
  children: React.ReactNode;
  className?: string;
}

const ChromaGrid = ({ children, className = '' }: ChromaGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.children;
    
    // Initial animation for grid items
    gsap.fromTo(items, 
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Hover animations
    Array.from(items).forEach((item) => {
      const element = item as HTMLElement;
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, [children]);

  return (
    <div ref={gridRef} className={`grid gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default ChromaGrid;