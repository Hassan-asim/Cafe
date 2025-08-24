import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { track } from '@vercel/analytics';
import Hero from '../components/Hero';
import FloatingIcons from '../components/FloatingIcons';

import { motion } from 'framer-motion';
import { loadCsvFromPublic } from '../utils/csv';

import TiltedPostGallery from '../components/TiltedPostGallery';
import FacebookReviews from '../components/FacebookReviews';
import ReelsGallery from '../components/ReelsGallery';
import StitchingMarks from '../components/StitchingMarks';


const HomeContainer = styled.div`
  background: linear-gradient(to bottom right, ${({ theme }) => theme.colors.gradientStart}, ${({ theme }) => theme.colors.gradientEnd});
  overflow-x: hidden;
  width: 100%;
`;

const Section = styled.div`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 3rem;
`;

const FeaturedItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const MenuItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 4px solid white;
`;

const CafeImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CafeImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const ImmersiveButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 1rem 2rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;



const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    // Track page view
    track('page_viewed', { page: 'home' });
    
    loadCsvFromPublic('Menu_Data.csv')
      .then((data) => setFeaturedItems(data.slice(0, 3)))
      .catch(() => setFeaturedItems([]));
  }, []);

  return (
    <HomeContainer>
      <FloatingIcons />
      <Hero />
      <StitchingMarks />
      
      <Section>
        <SectionTitle>Our Featured Items</SectionTitle>
        <FeaturedItemsGrid>
          {featuredItems.map((item) => (
            <MenuItem
              key={item.Item}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageContainer>
                <img src={item.Image || '/default-item.jpg'} alt={item.Item} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </ImageContainer>
              <h3>{item.Item}</h3>
            </MenuItem>
          ))}
        </FeaturedItemsGrid>
      </Section>
      <StitchingMarks />
      
      <TiltedPostGallery />
      <StitchingMarks />
      
      <FacebookReviews />
      <StitchingMarks />
      
      <ReelsGallery />
    </HomeContainer>
  );
};

export default Home;
