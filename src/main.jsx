import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './components/App';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { CartProvider } from './context/CartContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <GlobalStyle />
        <Router>
          <App />
        </Router>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
);