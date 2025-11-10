import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './GooeyNav.css';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface GooeyNavProps {
  items: NavItem[];
  activeTab: string;
  onTabChange: (path: string) => void;
}

const GooeyNav = ({ items, activeTab, onTabChange }: GooeyNavProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize GSAP animations
    gsap.set('.nav-item', { scale: 1 });
    gsap.set('.gooey-bg', { scale: 1, x: 0 });
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    gsap.to(`.nav-item-${index}`, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    gsap.to(`.nav-item-${index}`, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const activeIndex = items.findIndex(item => item.path === activeTab);

  return (
    <nav className="gooey-nav farm-theme">
      <div className="nav-container">
        {/* Gooey background blob */}
        <div 
          className="gooey-bg"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        
        {/* Navigation items */}
        {items.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => onTabChange(item.path)}
            className={`nav-item nav-item-${index} ${
              activeTab === item.path ? 'active' : ''
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default GooeyNav;