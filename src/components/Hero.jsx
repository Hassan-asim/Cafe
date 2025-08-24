import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Post1 from '../assets/post 1.jpg';
import Post2 from '../assets/post 2.jpg';
import Post3 from '../assets/post 3.jpg';
import Post4 from '../assets/post 4.jpg';
import Post6 from '../assets/post 6.jpg';
import TimingPost from '../assets/timing and info post.jpg';
import LogoImage from '../assets/logo.jpg';

const HeroContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, ${({ theme }) => theme.colors.gradientStart}, ${({ theme }) => theme.colors.gradientEnd});
  color: ${({ theme }) => theme.colors.dark};
  overflow: hidden;
  position: relative;
`;

const LogoContainer = styled(motion.div)`
  z-index: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainLogo = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border: 8px solid white;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.8rem;
  z-index: 1;
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ImmersiveButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.quaternary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 2rem;
  transition: transform 0.3s ease;
  z-index: 1;

  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const SidePostContainer = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 180px;
  height: 240px;
  z-index: 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  
  @media (max-width: 768px) {
    width: 120px;
    height: 160px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <SidePostContainer
        initial={{ x: -250, opacity: 0, rotate: -15 }}
        animate={{ x: 0, opacity: 0.8, rotate: -12 }}
        transition={{ duration: 1.2, delay: 0.5, type: 'spring', stiffness: 80 }}
        style={{ left: '2%', top: '35%' }}
      >
        <img src={Post1} alt="Kurtos Post" />
      </SidePostContainer>
      <SidePostContainer
        initial={{ x: 250, opacity: 0, rotate: 15 }}
        animate={{ x: 0, opacity: 0.8, rotate: 12 }}
        transition={{ duration: 1.2, delay: 0.5, type: 'spring', stiffness: 80 }}
        style={{ right: '2%', top: '35%' }}
      >
        <img src={Post2} alt="Kurtos Post" />
      </SidePostContainer>
      <SidePostContainer
        initial={{ y: -300, opacity: 0, rotate: 8 }}
        animate={{ y: 0, opacity: 0.6, rotate: 5 }}
        transition={{ duration: 1.4, delay: 0.8, type: 'spring', stiffness: 60 }}
        style={{ left: '15%', top: '10%' }}
      >
        <img src={Post3} alt="Kurtos Post" />
      </SidePostContainer>
      <SidePostContainer
        initial={{ x: 200, opacity: 0, rotate: -20 }}
        animate={{ x: 0, opacity: 0.7, rotate: -8 }}
        transition={{ duration: 1.3, delay: 1.0, type: 'spring', stiffness: 70 }}
        style={{ right: '15%', top: '10%' }}
      >
        <img src={Post4} alt="Kurtos Post" />
      </SidePostContainer>
      <SidePostContainer
        initial={{ x: -200, opacity: 0, rotate: 18 }}
        animate={{ x: 0, opacity: 0.6, rotate: 10 }}
        transition={{ duration: 1.5, delay: 1.2, type: 'spring', stiffness: 65 }}
        style={{ right: '8%', top: '75%' }}
      >
        <img src={Post6} alt="Kurtos Post" />
      </SidePostContainer>
      <SidePostContainer
        initial={{ y: 300, opacity: 0, rotate: -25 }}
        animate={{ y: 0, opacity: 0.5, rotate: -15 }}
        transition={{ duration: 1.6, delay: 1.4, type: 'spring', stiffness: 55 }}
        style={{ left: '8%', top: '75%' }}
      >
        <img src={TimingPost} alt="Timing and Info Post" />
      </SidePostContainer>
      <LogoContainer
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <MainLogo src={LogoImage} alt="Kurtos Logo" />
      </LogoContainer>
      <Subtitle
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Where Every Swirl Tells A Tale
      </Subtitle>
      <ImmersiveButton href="http://3d.typs.dev" target="_blank" rel="noopener noreferrer">
        Get an immersive experience 3D walk through
      </ImmersiveButton>
    </HeroContainer>
  );
};

export default Hero;