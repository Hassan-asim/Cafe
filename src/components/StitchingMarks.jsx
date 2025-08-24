import React from 'react';
import styled from 'styled-components';

const StitchingContainer = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -15px 0;
  z-index: 1;
`;

const ThickString = styled.div`
  width: 85%;
  height: 4px;
  background: white;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const VerticalStitch = styled.div`
  position: absolute;
  top: -10px;
  width: 3px;
  height: 25px;
  background: white;
  border-radius: 1.5px;
  transform-origin: bottom center;
  
  &:nth-child(1) { left: 8%; transform: rotate(-8deg); }
  &:nth-child(2) { left: 18%; transform: rotate(6deg); }
  &:nth-child(3) { left: 28%; transform: rotate(-4deg); }
  &:nth-child(4) { left: 38%; transform: rotate(7deg); }
  &:nth-child(5) { left: 48%; transform: rotate(-3deg); }
  &:nth-child(6) { left: 58%; transform: rotate(5deg); }
  &:nth-child(7) { left: 68%; transform: rotate(-6deg); }
  &:nth-child(8) { left: 78%; transform: rotate(4deg); }
  &:nth-child(9) { left: 88%; transform: rotate(-5deg); }
`;

const StitchingMarks = () => {
  return (
    <StitchingContainer>
      <ThickString>
        <VerticalStitch />
        <VerticalStitch />
        <VerticalStitch />
        <VerticalStitch />
        <VerticalStitch />
        <VerticalStitch />
        <VerticalStitch />
        <VerticalStitch />
        <VerticalStitch />
      </ThickString>
    </StitchingContainer>
  );
};

export default StitchingMarks;
