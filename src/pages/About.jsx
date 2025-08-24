import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { track } from '@vercel/analytics';
import StitchingMarks from '../components/StitchingMarks';
import Banner from '../assets/banner.jpg';
import Post1 from '../assets/post 1.jpg';
import Post2 from '../assets/post 2.jpg';
import Post3 from '../assets/post 3.jpg';
import Post4 from '../assets/post 4.jpg';
import Post6 from '../assets/post 6.jpg';
import Post7 from '../assets/post 7.jpg';
import Post8 from '../assets/post 8.jpg';
import Post9 from '../assets/post 9.jpg';
import Post10 from '../assets/post 10.jpg';
import Post11 from '../assets/post 11.jpg';
import Post12 from '../assets/post 12.jpg';
import TimingPost from '../assets/timing and info post.jpg';

const AboutContainer = styled.div`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 50%, ${({ theme }) => theme.colors.accent} 100%);
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Story = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.dark};

  p {
    margin-bottom: 1.5rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
`;

const TeamImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const About = () => {
  useEffect(() => {
    // Track page view
    track('page_viewed', { page: 'about' });
  }, []);

  return (
    <AboutContainer>
      <Section>
        <Title
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Our Delicious Story
        </Title>
        <Story
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>
            It all started with a dream and a secret family recipe for the most amazing chimney cakes (Kurtos Kalacs). We wanted to create a cozy little corner in the world where people could escape, indulge in sweet treats, and sip on the richest, most aromatic coffee.
          </p>
          <p>
            At Kurtos, every chimney cake is baked with love, right before your eyes. We use only the freshest ingredients, and our passion for perfection is poured into every single cone. From classic cinnamon sugar to decadent chocolate drizzles, there's a Kurtos for everyone.
          </p>
          <p>
            But we're more than just a cafe. We're a place for laughter, conversations, and creating sweet memories. So come on in, grab a Kurtos, and be a part of our story!
          </p>
        </Story>
      </Section>
      <StitchingMarks />

      <Section>
        <Title>Our Cafe Gallery</Title>
        <GalleryGrid>
          <GalleryImage 
            src={Banner} 
            alt="Cafe Banner"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          />
          <GalleryImage 
            src={Post1} 
            alt="Post 1"
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <GalleryImage 
            src={Post2} 
            alt="Post 2"
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <GalleryImage 
            src={Post3} 
            alt="Post 3"
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <GalleryImage 
            src={Post4} 
            alt="Post 4"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <GalleryImage 
            src={Post6} 
            alt="Post 6"
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <GalleryImage 
            src={Post7} 
            alt="Post 7"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          <GalleryImage 
            src={Post8} 
            alt="Post 8"
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          <GalleryImage 
            src={Post9} 
            alt="Post 9"
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <GalleryImage 
            src={Post10} 
            alt="Post 10"
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
          <GalleryImage 
            src={Post11} 
            alt="Post 11"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          />
          <GalleryImage 
            src={Post12} 
            alt="Post 12"
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          />
          <GalleryImage 
            src={TimingPost} 
            alt="Timing and Info"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
        </GalleryGrid>
      </Section>
    </AboutContainer>
  );
};

export default About;