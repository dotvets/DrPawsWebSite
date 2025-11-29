import { useMemo } from 'react';
import { motion } from 'framer-motion';

const PawPrint = ({ color, size, top, left, duration, delay }: {
  color: string;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.06,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -15, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill={color}
        width="100%"
        height="100%"
      >
        <path d="M12 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-9 6c0-1.66 1.34-3 3-3s3 1.34 3 3H9zm-3 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        <ellipse cx="12" cy="20" rx="4" ry="2.5"/>
      </svg>
    </motion.div>
  );
};

export default function AnimatedPawBackground() {
  const brandColors = [
    '#18ac61',
    '#264653',
    '#e9c46a',
    '#f4a261',
  ];

  const pawPrints = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
      size: Math.random() * 40 + 60,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pawPrints.map((paw) => (
        <PawPrint
          key={paw.id}
          color={paw.color}
          size={paw.size}
          top={paw.top}
          left={paw.left}
          duration={paw.duration}
          delay={paw.delay}
        />
      ))}
    </div>
  );
}
