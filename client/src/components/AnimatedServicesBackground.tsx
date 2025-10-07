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
        opacity: 0.08,
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
        viewBox="0 0 100 100"
        fill={color}
        width="100%"
        height="100%"
      >
        {/* Main pad - larger and rounder */}
        <ellipse cx="50" cy="70" rx="22" ry="25" />
        {/* Top toe - bigger and rounder */}
        <circle cx="50" cy="20" r="12" />
        {/* Left toe */}
        <circle cx="28" cy="38" r="11" />
        {/* Right toe */}
        <circle cx="72" cy="38" r="11" />
      </svg>
    </motion.div>
  );
};

const Bone = ({ color, size, top, left, duration, delay }: {
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
        opacity: 0.08,
      }}
      animate={{
        y: [0, 30, 0],
        x: [0, -15, 15, 0],
        rotate: [0, -10, 10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 120 60"
        fill={color}
        width="100%"
        height="100%"
      >
        {/* Left end circles - closer together */}
        <circle cx="15" cy="20" r="10" />
        <circle cx="15" cy="40" r="10" />
        {/* Right end circles - closer together */}
        <circle cx="105" cy="20" r="10" />
        <circle cx="105" cy="40" r="10" />
        {/* Center bar connecting both ends - thicker */}
        <rect x="20" y="23" width="80" height="14" rx="7" ry="7" />
      </svg>
    </motion.div>
  );
};

export default function AnimatedServicesBackground() {
  const brandColors = [
    '#18ac61',
    '#264653',
    '#e9c46a',
    '#f4a261',
  ];

  const elements = useMemo(() => {
    const items = [];
    
    // Create 12 paw prints
    for (let i = 0; i < 12; i++) {
      items.push({
        id: `paw-${i}`,
        type: 'paw',
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        size: Math.random() * 40 + 60,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
      });
    }
    
    // Create 6 bones
    for (let i = 0; i < 6; i++) {
      items.push({
        id: `bone-${i}`,
        type: 'bone',
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        size: Math.random() * 40 + 60,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
      });
    }
    
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        element.type === 'paw' ? (
          <PawPrint
            key={element.id}
            color={element.color}
            size={element.size}
            top={element.top}
            left={element.left}
            duration={element.duration}
            delay={element.delay}
          />
        ) : (
          <Bone
            key={element.id}
            color={element.color}
            size={element.size}
            top={element.top}
            left={element.left}
            duration={element.duration}
            delay={element.delay}
          />
        )
      ))}
    </div>
  );
}
