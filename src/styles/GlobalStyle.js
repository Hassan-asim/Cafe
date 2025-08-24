import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pacifico', cursive;
    background-color: ${theme.colors.light};
    min-height: 100vh;
    overflow-x: hidden;
    width: 100%;
  }

  #root {
    overflow-x: hidden;
    width: 100%;
  }

  /* Ensure all containers respect viewport width */
  div, section, main, aside, header, footer {
    max-width: 100vw;
    overflow-x: hidden;
  }

  /* Prevent horizontal scroll on mobile */
  @media (max-width: 768px) {
    html, body, #root {
      overflow-x: hidden;
      width: 100%;
    }
  }
`;
