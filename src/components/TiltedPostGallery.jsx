import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
import CoffeePost from '../assets/cofee post.jpg';

const GalleryContainer = styled.div`
  position: relative;
  height: 800px;
  margin: 4rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  
  @media (max-width: 768px) {
    height: 600px;
    margin: 2rem 0;
    padding: 1rem;
  }
`;

const PostCard = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    z-index: 10;
    transform: scale(1.05) rotate(0deg) !important;
    
    img {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 180px;
    height: 220px;
  }
`;

const TiltedPostGallery = () => {
  const posts = [
    { src: Post1, x: '5%', y: '10%', rotate: -8, delay: 0 },
    { src: Post2, x: '20%', y: '5%', rotate: 12, delay: 0.1 },
    { src: Post3, x: '40%', y: '15%', rotate: -5, delay: 0.2 },
    { src: Post4, x: '60%', y: '8%', rotate: 10, delay: 0.3 },
    { src: Post6, x: '80%', y: '12%', rotate: -12, delay: 0.4 },
    { src: Post7, x: '10%', y: '40%', rotate: 15, delay: 0.5 },
    { src: Post8, x: '30%', y: '45%', rotate: -10, delay: 0.6 },
    { src: Post9, x: '55%', y: '35%', rotate: 8, delay: 0.7 },
    { src: Post10, x: '75%', y: '50%', rotate: -15, delay: 0.8 },
    { src: Post11, x: '90%', y: '25%', rotate: 7, delay: 0.9 },
    { src: Post12, x: '15%', y: '70%', rotate: -5, delay: 1.0 },
    { src: CoffeePost, x: '65%', y: '70%', rotate: 12, delay: 1.1 },
  ];

  return (
    <GalleryContainer>
      {posts.map((post, i) => (
        <PostCard
          key={i}
          initial={{ opacity: 0, scale: 0.8, rotate: post.rotate + 20 }}
          whileInView={{ opacity: 0.85, scale: 1, rotate: post.rotate }}
          transition={{ duration: 0.6, delay: post.delay }}
          style={{ 
            left: post.x, 
            top: post.y,
            transform: `rotate(${post.rotate}deg)`
          }}
        >
          <img src={post.src} alt={`Post ${i + 1}`} />
        </PostCard>
      ))}
    </GalleryContainer>
  );
};

export default TiltedPostGallery;
