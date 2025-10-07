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
        opacity: 0.06,
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
        viewBox="0 0 24 24"
        fill={color}
        width="100%"
        height="100%"
      >
        <path d="M17.5 4c-1.38 0-2.5 1.12-2.5 2.5 0 .69.28 1.31.73 1.76L8.27 15.73C7.82 15.28 7.19 15 6.5 15c-1.38 0-2.5 1.12-2.5 2.5S5.12 20 6.5 20s2.5-1.12 2.5-2.5c0-.69-.28-1.31-.73-1.76l7.46-7.47c.45.45 1.08.73 1.77.73 1.38 0 2.5-1.12 2.5-2.5S18.88 4 17.5 4zM6.5 18c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm11-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/>
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
