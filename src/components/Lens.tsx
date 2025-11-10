import { useState, useRef, useEffect } from 'react';
import './Lens.css';

interface LensProps {
  children: React.ReactNode;
  lensSize?: number;
  zoomLevel?: number;
  className?: string;
}

const Lens = ({ 
  children, 
  lensSize = 200, 
  zoomLevel = 2, 
  className = '' 
}: LensProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setLensPosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`lens-container ${className}`}
    >
      {children}
      
      {isHovering && (
        <div
          ref={lensRef}
          className="lens-magnifier"
          style={{
            width: lensSize,
            height: lensSize,
            left: lensPosition.x - lensSize / 2,
            top: lensPosition.y - lensSize / 2,
            transform: `scale(${zoomLevel})`,
          }}
        >
          <div 
            className="lens-content"
            style={{
              transform: `translate(${-lensPosition.x + lensSize / 2}px, ${-lensPosition.y + lensSize / 2}px) scale(${zoomLevel})`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lens;