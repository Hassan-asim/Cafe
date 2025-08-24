import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StitchingMarks from '../components/StitchingMarks';
import { loadCsvFromPublic } from '../utils/csv';

const MenuContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.tertiary} 50%, ${({ theme }) => theme.colors.quaternary} 100%);
  color: ${({ theme }) => theme.colors.dark};
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  text-align: center;
`;

const SearchInput = styled.input`
  display: block;
  width: 50%;
  margin: 2rem auto;
  padding: 0.8rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.dark};
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 10px rgba(255, 152, 153, 0.3);
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CategoryCard = styled(motion(Link))`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCsvFromPublic('Menu_Data.csv').then(setMenu).catch(() => setMenu([]));
  }, []);

  const categories = Array.from(
    new Set(
      menu
        .map((i) => i.Category)
        .filter(Boolean)
    )
  )
  .filter((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort();

  return (
    <MenuContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Browse Menu by Category
      </Title>
      <SearchInput
        type="text"
        placeholder="Search categories..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StitchingMarks />
      <CategoriesGrid>
        {categories.map((category) => (
          <CategoryCard
            key={category}
            to={`/menu/${encodeURIComponent(category)}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 style={{ marginBottom: '0.5rem' }}>{category}</h2>
            <p>Explore delicious {category.toLowerCase()}</p>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </MenuContainer>
  );
};

export default Menu;
