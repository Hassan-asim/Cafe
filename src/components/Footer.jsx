import React from 'react';
import styled from 'styled-components';
import { track } from '@vercel/analytics';

const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.quaternary};
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
  border-radius: 20px 20px 0 0;
`;

const SocialLinks = styled.div`
  margin-top: 1rem;
  a {
    color: ${({ theme }) => theme.colors.light};
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.5rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Kurtos. All Rights Reserved.</p>
      
      <div style={{ margin: '1rem 0' }}>
        <p style={{ margin: '0.5rem 0', fontSize: '1rem' }}>
          <strong>📍 Location:</strong> Shop#5, Mosaic District, 1-A Mir Chakar Khan Rd, I-8 Markaz, Islamabad, Pakistan
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '1rem' }}>
          <strong>📧 Email:</strong> <a 
            href="mailto:kurtos.pakistan@gmail.com" 
            style={{ color: 'white', textDecoration: 'underline' }}
            onClick={() => track('email_clicked', { source: 'footer' })}
          >
            kurtos.pakistan@gmail.com
          </a>
        </p>
      </div>
      
      <SocialLinks>
        <a 
          href="https://www.instagram.com/kurtos_pakistan/" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => track('social_media_clicked', { platform: 'instagram', source: 'footer' })}
        >
          Instagram
        </a>
        <a 
          href="https://www.facebook.com/kurtospakistan/" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => track('social_media_clicked', { platform: 'facebook', source: 'footer' })}
        >
          Facebook
        </a>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer;
