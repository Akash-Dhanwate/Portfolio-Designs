import React, { useRef, useState, useEffect, useCallback } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from mouse to center
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Check if mouse is within element bounds + padding
      const maxDistanceX = rect.width / 2 + padding;
      const maxDistanceY = rect.height / 2 + padding;

      if (Math.abs(distX) <= maxDistanceX && Math.abs(distY) <= maxDistanceY) {
        setIsActive(true);
        setPosition({
          x: distX / strength,
          y: distY / strength,
        });
      } else {
        if (isActive) {
          setIsActive(false);
          setPosition({ x: 0, y: 0 });
        }
      }
    },
    [padding, strength, isActive]
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Magnet;
