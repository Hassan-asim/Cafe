import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from '../pages/Home';
import About from '../pages/About';
import Menu from '../pages/Menu';
import MenuCategory from '../pages/MenuCategory';
import Admin from '../pages/Admin';
import Navbar from './Navbar';
import Footer from './Footer';
import Cart from './Cart';
// import { cacheManager } from '../utils/cache';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

            // Initialize caching system
          useEffect(() => {
            // Temporarily disable service worker for Vercel deployment
            // if ('serviceWorker' in navigator) {
            //   navigator.serviceWorker.register('/service-worker.js')
            //     .then(registration => {
            //       console.log('Service Worker registered with scope:', registration.scope);
            //     })
            //     .catch(error => {
            //       console.log('Service Worker registration failed:', error);
            //     });
            // }
          }, []);

            return (
            <div>
              <Navbar toggleCart={toggleCart} />
              <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:category" element={<MenuCategory />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
              <Analytics />
            </div>
          );
};

export default App;
