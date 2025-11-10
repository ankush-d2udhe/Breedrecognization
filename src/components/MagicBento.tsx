import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

interface BentoItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  color: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning';
  children?: React.ReactNode;
}

interface MagicBentoProps {
  items: BentoItem[];
  className?: string;
}

const MagicBento = ({ items, className = '' }: MagicBentoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const bentoItems = containerRef.current.querySelectorAll('.bento-item');
    
    // Initial animation
    gsap.fromTo(bentoItems, 
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationX: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    );

    // Hover animations
    bentoItems.forEach((item) => {
      const element = item as HTMLElement;
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.02,
          y: -8,
          rotationY: 2,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    return () => {
      gsap.killTweensOf(bentoItems);
    };
  }, [items]);

  return (
    <div ref={containerRef} className={`magic-bento ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`bento-item bento-${item.size} bento-${item.color}`}
        >
          <div className="bento-content">
            {item.icon && (
              <div className="bento-icon">
                <span>{item.icon}</span>
              </div>
            )}
            <div className="bento-text">
              <h3 className="bento-title">{item.title}</h3>
              {item.description && (
                <p className="bento-description">{item.description}</p>
              )}
            </div>
            {item.children && (
              <div className="bento-children">
                {item.children}
              </div>
            )}
          </div>
          <div className="bento-glow"></div>
        </div>
      ))}
    </div>
  );
};

export default MagicBento;