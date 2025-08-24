import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ReviewsSection = styled.div`
  padding: 6rem 2rem 8rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.tertiary} 0%, ${({ theme }) => theme.colors.quaternary} 100%);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const ReviewsGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  flex-wrap: nowrap;
  
  @media (max-width: 1200px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const ReviewCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  
  @media (max-width: 768px) {
    min-width: 200px;
    max-width: 300px;
  }
`;

const ReviewText = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ReviewAuthor = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Stars = styled.div`
  color: #FFD700;
  margin-bottom: 0.5rem;
`;

// Placeholder reviews - in production, these would come from Facebook API
const reviews = [
  {
    name: "Sarmad",
    text: "Really tasty! The chimney cakes are amazing and the coffee is perfect.",
    rating: 5,
    date: "March 23, 2025"
  },
  {
    name: "Ahmad Ali", 
    text: "Best kurtos in Islamabad! Fresh and delicious every time.",
    rating: 5,
    date: "March 20, 2025"
  },
  {
    name: "Fatima Khan",
    text: "Love the variety of flavors. The Nutella shake is my favorite!",
    rating: 5,
    date: "March 18, 2025"
  },
  {
    name: "Hassan Ahmed",
    text: "Great atmosphere and friendly staff. Highly recommend!",
    rating: 4,
    date: "March 15, 2025"
  }
];

const FacebookReviews = () => {
  return (
    <ReviewsSection>
      <Title>What Our Customers Say</Title>
      <ReviewsGrid>
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Stars>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </Stars>
            <ReviewText>"{review.text}"</ReviewText>
            <ReviewAuthor>- {review.name}</ReviewAuthor>
            <small style={{ color: '#666' }}>{review.date}</small>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </ReviewsSection>
  );
};

export default FacebookReviews;
