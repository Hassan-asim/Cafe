import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';

const Nav = styled.nav`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.quaternary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 20px 20px;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    flex-wrap: wrap;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BrandName = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.light};
  margin: 0;
  font-family: 'Pacifico', cursive;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.3rem;
    flex-wrap: wrap;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  margin: 0 0.8rem;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    margin: 0 0.4rem;
    font-size: 0.9rem;
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  margin: 0 0.6rem;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    margin: 0 0.3rem;
    font-size: 0.8rem;
  }
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const NotificationToast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

import Logo from './Logo';

const Navbar = ({ toggleCart }) => {
  const { getTotalItems, notification } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <>
      <Nav>
        <LogoSection>
          <Logo />
          <BrandName>Kurtos</BrandName>
        </LogoSection>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <ExternalLink href="https://www.foodpanda.pk/restaurant/y3wu/kurtos-i8" target="_blank" rel="noopener noreferrer">Foodpanda</ExternalLink>
          <CartButton onClick={toggleCart}>
            🛒
            {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
          </CartButton>
        </NavLinks>
      </Nav>
      {notification && <NotificationToast>{notification}</NotificationToast>}
    </>
  );
};

export default Navbar;