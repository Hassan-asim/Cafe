import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.Item === item.Item && (cartItem.selectedSize || '') === (item.selectedSize || ''));
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.Item === item.Item && (cartItem.selectedSize || '') === (item.selectedSize || '')
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const price = item.price || item['Regular Price'] || item.Price || 0;
        return [...prevCart, { ...item, price, quantity: 1 }];
      }
    });
    
    // Show notification
    setNotification(`${item.Item} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const incrementQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.Item === item.Item && (cartItem.selectedSize || '') === (item.selectedSize || '')
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decrementQuantity = (item) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.Item === item.Item && (cartItem.selectedSize || '') === (item.selectedSize || '')
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      incrementQuantity, 
      decrementQuantity, 
      setCart, 
      notification,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};