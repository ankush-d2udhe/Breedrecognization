import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LiquidEther.css';

interface LiquidEtherProps {
  className?: string;
}

const LiquidEther = ({ className = '' }: LiquidEtherProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const blobs = blobsRef.current;
    
    // Initialize blob animations
    blobs.forEach((blob, index) => {
      if (!blob) return;
      
      // Set initial positions
      gsap.set(blob, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      });

      // Create floating animation
      gsap.to(blob, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5
      });

      // Scale pulsing animation
      gsap.to(blob, {
        scale: `+=${Math.random() * 0.3 + 0.1}`,
        duration: Math.random() * 8 + 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.3
      });
    });

    // Cleanup function
    return () => {
      gsap.killTweensOf(blobs);
    };
  }, []);

  const addBlobRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      blobsRef.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className={`liquid-ether ${className}`}>
      <div className="liquid-container">
        {/* Primary blobs */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`primary-${i}`}
            ref={(el) => addBlobRef(el, i)}
            className={`liquid-blob primary-blob blob-${i + 1}`}
          />
        ))}
        
        {/* Secondary blobs */}
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={`secondary-${i}`}
            ref={(el) => addBlobRef(el, i + 6)}
            className={`liquid-blob secondary-blob secondary-${i + 1}`}
          />
        ))}
        
        {/* Accent blobs */}
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={`accent-${i}`}
            ref={(el) => addBlobRef(el, i + 10)}
            className={`liquid-blob accent-blob accent-${i + 1}`}
          />
        ))}
      </div>
      
      {/* Overlay gradient */}
      <div className="liquid-overlay" />
    </div>
  );
};

export default LiquidEther;