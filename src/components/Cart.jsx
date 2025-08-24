import React, { useContext, useState } from 'react';
import styled from 'styled-components';
// import { track } from '@vercel/analytics';
import { CartContext } from '../context/CartContext';

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CartContainer = styled.div`
  width: 90vw;
  max-width: 800px;
  height: 90vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 50%, ${({ theme }) => theme.colors.accent} 100%);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 95vw;
    height: 95vh;
    padding: 1.5rem;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 1rem;
`;

const CartTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.dark};
  margin: 0;
  font-family: 'Pacifico', cursive;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CloseButton = styled.button`
  background: ${({ theme }) => theme.colors.quaternary};
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const CartContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255,255,255,0.9);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  
  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  text-align: left;
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.dark};
  }
  
  p {
    margin: 0.2rem 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.dark};
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const QuantityButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1);
  }
`;

const Quantity = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  min-width: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
`;

const CartTotal = styled.div`
  background: rgba(255,255,255,0.95);
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  
  h3 {
    margin: 0;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const CheckoutSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckoutForm = styled.div`
  background: rgba(255,255,255,0.95);
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const FormTitle = styled.h3`
  margin: 0 0 1rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 10px rgba(255, 152, 153, 0.3);
  }
  
  &:invalid {
    border-color: #ff4444;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 10px rgba(255, 152, 153, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CheckoutButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FoodpandaButton = styled.a`
  flex: 1;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.quaternary};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
    transform: translateY(-2px);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.dark};
  
  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;

const Cart = ({ isOpen, toggleCart }) => {
  const { cart, incrementQuantity, decrementQuantity, setCart, addToCart } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const isFormValid = () => {
    return customerInfo.name.trim() && 
           customerInfo.phone.trim() && 
           customerInfo.address.trim() &&
           cart.length > 0;
  };

  const generateOrderSummary = () => {
    const items = cart.map(item => 
      `${item.Item}${item.selectedSize ? ` (${item.selectedSize})` : ''} x${item.quantity} = Rs. ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    return `Order Summary:
${items}

Total: Rs. ${calculateTotal().toFixed(2)}

Customer Information:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}`;
  };

  const handleCheckout = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required information');
      return;
    }

    // Track checkout attempt
    // track('checkout_attempted', {
    //   cartValue: calculateTotal().toFixed(2),
    //   itemCount: cart.length
    // });

    try {
      setIsCheckingOut(true);

      // Prepare order data
      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        cartItems: cart.map(item => ({
          name: item.Item,
          quantity: item.quantity,
          price: parseFloat(item.price).toFixed(2),
          size: item.selectedSize || 'Regular'
        })),
        totalAmount: calculateTotal().toFixed(2)
      };

      // Send order email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Track successful checkout
      // track('checkout_completed', {
      //   orderTotal: totalAmount,
      //   itemCount: cart.length,
      //   customerName: customerInfo.name
      // });

      // Clear cart and form after successful checkout
      setCart([]);
      setCustomerInfo({ name: '', phone: '', address: '' });
      
      alert('Thank you for your order! An email has been sent to our team with your order details.');
      toggleCart();

    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error.message}. Please try again or contact us directly.`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  };

  // Track cart open
  // useEffect(() => {
  //   if (isOpen) {
  //     // track('cart_opened', {
  //     //   itemCount: cart.length,
  //     //   cartValue: calculateTotal().toFixed(2)
  //     // });
  //   }
  // }, [isOpen, cart.length]);

  return (
    <CartOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <CartContainer>
        <CartHeader>
          <CartTitle>Your Cart</CartTitle>
          <CloseButton onClick={toggleCart}>&times;</CloseButton>
        </CartHeader>
        
        <CartContent>
          {cart.length === 0 ? (
            <EmptyCart>
              <h3>Your cart is empty</h3>
              <p>Add some delicious items to get started!</p>
            </EmptyCart>
          ) : (
            <>
              <CartItems>
                {cart.map((item, index) => (
                  <CartItem key={index}>
                    <ItemDetails>
                      <h4>{item.Item}</h4>
                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      <p>Rs. {parseFloat(item.price).toFixed(2)} each</p>
                    </ItemDetails>
                    <QuantityControls>
                      <QuantityButton onClick={() => decrementQuantity(item)}>
                        -
                      </QuantityButton>
                      <Quantity>{item.quantity}</Quantity>
                      <QuantityButton onClick={() => incrementQuantity(item)}>
                        +
                      </QuantityButton>
                    </QuantityControls>
                  </CartItem>
                ))}
              </CartItems>
              
              <CartTotal>
                <h3>Total: Rs. {calculateTotal().toFixed(2)}</h3>
              </CartTotal>
              
              <CheckoutSection>
                <CheckoutForm>
                  <FormTitle>Customer Information</FormTitle>
                  <Input
                    type="text"
                    placeholder="Full Name *"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                  <TextArea
                    placeholder="Delivery Address *"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </CheckoutForm>
                
                <ButtonGroup>
                                  <CheckoutButton
                  onClick={handleCheckout}
                  disabled={!isFormValid() || isCheckingOut}
                  data-checkout-button
                >
                  {isCheckingOut && <LoadingSpinner />}
                  {isCheckingOut 
                    ? 'Processing Order...' 
                    : isFormValid() 
                      ? 'Checkout via Email' 
                      : 'Please fill all fields'
                  }
                </CheckoutButton>
                  
                                      <FoodpandaButton 
                      href="https://www.foodpanda.pk/restaurant/y3wu/kurtos-i8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                                                onClick={() => {
                            // track('foodpanda_clicked', { 
                            //   source: 'cart',
                            //   cartValue: calculateTotal().toFixed(2)
                            // });
                          }}
                    >
                      Order via Foodpanda
                    </FoodpandaButton>
                </ButtonGroup>
              </CheckoutSection>
            </>
          )}
        </CartContent>
      </CartContainer>
    </CartOverlay>
  );
};

export default Cart;