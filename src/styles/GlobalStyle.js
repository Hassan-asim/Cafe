import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pacifico', cursive;
    background-color: ${theme.colors.light};
    min-height: 100vh;
  }
`;
