import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import only basic, confirmed working SVG icons
import Coffee from '../assets/coffee.svg';
import Croissant from '../assets/croissant.svg';
import Cake from '../assets/cake.svg';
import Donut from '../assets/donut.svg';
import Cupcake from '../assets/cupcake.svg';
import Bread from '../assets/bread.svg';

const FloatingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const IconContainer = styled(motion.div)`
  position: absolute;
  opacity: 0.15;
  will-change: transform;
  
  @media (max-width: 768px) {
    opacity: 0.1;
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  filter: brightness(0.9) contrast(1.3) drop-shadow(0 2px 4px rgba(0,0,0,0.1));
`;

// Create a simple list of confirmed working bakery icons
const bakeryIcons = [
  Coffee, Croissant, Cake, Donut, Cupcake, Bread
];

// Generate floating icon configurations
const generateIcons = () => {
  const icons = [];
  const iconCount = 8; // Further reduced for stability
  
  for (let i = 0; i < iconCount; i++) {
    const randomIcon = bakeryIcons[Math.floor(Math.random() * bakeryIcons.length)];
    const x = Math.random() * 100; // 0-100vw
    const y = Math.random() * 100; // 0-100vh
    const size = 25 + Math.random() * 35; // 25-60px (medium)
    const duration = 3 + Math.random() * 4; // 3-7 seconds (faster)
    const delay = Math.random() * 2; // 0-2 second delay
    const direction = Math.random() > 0.5 ? 1 : -1; // Random direction
    
    icons.push({
      id: i,
      src: randomIcon,
      x: `${x}vw`,
      y: `${y}vh`,
      size,
      duration,
      delay,
      direction
    });
  }
  
  return icons;
};

const FloatingIcons = () => {
  const icons = generateIcons();

  return (
    <FloatingContainer>
      {icons.map((icon) => (
        <IconContainer
          key={icon.id}
          style={{
            left: icon.x,
            top: icon.y,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
          animate={{
            y: [0, -35 * icon.direction, 0],
            x: [0, 15 * icon.direction, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: icon.delay,
          }}
        >
          <Icon src={icon.src} alt="floating bakery icon" />
        </IconContainer>
      ))}
    </FloatingContainer>
  );
};

export default FloatingIcons;