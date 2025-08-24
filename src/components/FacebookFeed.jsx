import React, { useEffect } from 'react';
import styled from 'styled-components';

const FeedContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  .fb-page {
    max-width: 100%;
  }
`;

const FacebookFeed = () => {
  useEffect(() => {
    const tryParse = () => {
      if (window.FB && window.FB.XFBML && window.FB.XFBML.parse) {
        window.FB.XFBML.parse();
      }
    };
    const id = setTimeout(tryParse, 800);
    return () => clearTimeout(id);
  }, []);

  return (
    <FeedContainer>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/kurtospakistan"
        data-tabs="timeline"
        data-width="500"
        data-height="600"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="true"
        data-show-facepile="false"
      >
        <blockquote cite="https://www.facebook.com/kurtospakistan" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/kurtospakistan">Kurtos Pakistan</a>
        </blockquote>
      </div>
    </FeedContainer>
  );
};

export default FacebookFeed;
