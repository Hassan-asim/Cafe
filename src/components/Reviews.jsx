import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ReviewsContainer = styled.div`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 3rem;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ReviewCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.dark};
`;

const dummyReviews = [
  {
    name: 'John Doe',
    review: 'The best chimney cakes in town! The coffee is amazing too.',
  },
  {
    name: 'Jane Smith',
    review: 'A cozy place with a great atmosphere. I love their Nutella shake!',
  },
  {
    name: 'Peter Jones',
    review: 'I keep coming back for the delicious Kurtos and friendly staff.',
  },
];

const Reviews = () => {
  return (
    <ReviewsContainer>
      <Title>What Our Customers Say</Title>
      <ReviewsGrid>
        {dummyReviews.map((review, index) => (
          <ReviewCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3>{review.name}</h3>
            <p>"{review.review}"</p>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </ReviewsContainer>
  );
};

export default Reviews;
