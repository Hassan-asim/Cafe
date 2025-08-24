import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImg from '../assets/logo.png';

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Img = styled.img`
  height: 48px;
  width: auto;
  border-radius: 8px;
`;

const Logo = () => {
  return (
    <LogoContainer to="/">
      <Img src={LogoImg} alt="Kurtos Logo" />
    </LogoContainer>
  );
};

export default Logo;
