import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Post1 from '../assets/post1.jpg';
import Post2 from '../assets/post 2.jpg';
import Post3 from '../assets/post 3.jpg';
import Post4 from '../assets/post 4.jpg';
import Post5 from '../assets/post 5.jpg';

const Section = styled.div`
  padding: 4rem 2rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const InstagramGallery = () => {
  const images = [Post1, Post2, Post3, Post4, Post5].filter(Boolean);
  return (
    <Section>
      <Title>From Our Instagram</Title>
      <Grid>
        {images.map((src, i) => (
          <Img
            key={i}
            src={src}
            alt={`Instagram post ${i + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          />
        ))}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <a href="https://www.instagram.com/kurtos_pakistan/" target="_blank" rel="noopener noreferrer">Follow us on Instagram</a>
      </div>
    </Section>
  );
};

export default InstagramGallery;
