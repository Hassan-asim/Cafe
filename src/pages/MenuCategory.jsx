import React, { useEffect, useMemo, useState, useContext } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { track } from '@vercel/analytics';
import { loadCsvFromPublic } from '../utils/csv';
import { CartContext } from '../context/CartContext';
import StitchingMarks from '../components/StitchingMarks';


const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const ImgWrap = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 4px solid white;
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const Radio = styled.label`
  display: inline-flex;
  align-items: center;
  margin: 0 0.5rem;
  input { margin-right: 0.3rem; }
`;

const MenuCategory = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Track page view
    track('page_viewed', { page: 'menu_category', category: decodeURIComponent(category) });
    
    loadCsvFromPublic('Menu_Data.csv').then(setData).catch(() => setData([]));
  }, [category]);

  const items = useMemo(() => data.filter((i) => (i.Category || '').toLowerCase() === decodeURIComponent(category).toLowerCase()), [data, category]);

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleAdd = (item) => {
    const selectedSize = selectedSizes[item.Item] || (item['Regular Price'] ? 'Regular' : (item['Large Price'] ? 'Large' : ''));
    const price = selectedSize === 'Large' ? item['Large Price'] : (item['Regular Price'] || item.Price);
    
    // Track item added from category page
    track('item_added_from_category', {
      itemName: item.Item,
      category: item.Category,
      selectedSize,
      price
    });
    
    addToCart({ ...item, selectedSize, price });
  };

  const title = decodeURIComponent(category);

  return (
    <Container>
      <BackLink 
        to="/menu" 
        onClick={() => track('navigation', { from: 'menu_category', to: 'menu', category: decodeURIComponent(category) })}
      >
        ← Back to Categories
      </BackLink>
      <Title>{title}</Title>
      <StitchingMarks />
      <Grid>
        {items.map((item) => (
          <Card key={item.Item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                         <ImgWrap>
               <img src={item.img || '/default-item.jpg'} alt={item.Item} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </ImgWrap>
            <h3>{item.Item}</h3>
            {(item['Regular Price'] || item['Large Price']) && (
              <div>
                {item['Regular Price'] && (
                  <Radio>
                    <input type="radio" name={`size-${item.Item}`} value="Regular" checked={(selectedSizes[item.Item] || 'Regular') === 'Regular'} onChange={() => handleSizeChange(item.Item, 'Regular')} />
                    Regular (Rs. {item['Regular Price']})
                  </Radio>
                )}
                {item['Large Price'] && (
                  <Radio>
                    <input type="radio" name={`size-${item.Item}`} value="Large" checked={selectedSizes[item.Item] === 'Large'} onChange={() => handleSizeChange(item.Item, 'Large')} />
                    Large (Rs. {item['Large Price']})
                  </Radio>
                )}
              </div>
            )}
            {!item['Regular Price'] && !item['Large Price'] && item.Price && (
              <p>Price: {item.Price}</p>
            )}
            <AddButton onClick={() => handleAdd(item)}>Add to Cart</AddButton>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default MenuCategory;
