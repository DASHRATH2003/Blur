import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Helper function to format price to 2 decimal places
const formatPrice = (price) => {
  return parseFloat(price.toFixed(2));
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  // Add item to cart - optimized for instant response
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      // Update or add new item
      const newItems = existingItem
        ? prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevItems, { ...product, quantity }];

      // Show minimal toast notification
      toast.success(
        existingItem 
          ? `+${quantity} ${product.name}`
          : `Added ${product.name}`,
        {
          duration: 1000,
          position: 'top-right',
          style: {
            background: '#333',
            color: '#fff',
            padding: '4px 8px',
            fontSize: '14px',
            borderRadius: '4px',
          },
        }
      );

      return newItems;
    });
  }, []);

  // Remove item from cart - optimized for instant response
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name}`, {
          duration: 1000,
          position: 'top-right',
          style: {
            background: '#333',
            color: '#fff',
            padding: '4px 8px',
            fontSize: '14px',
            borderRadius: '4px',
          },
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  }, []);

  // Update item quantity - optimized for instant response
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );

      const updatedItem = updatedItems.find(item => item.id === productId);
      if (updatedItem) {
        toast.success(`Updated ${updatedItem.name}`, {
          duration: 1000,
          position: 'top-right',
          style: {
            background: '#333',
            color: '#fff',
            padding: '4px 8px',
            fontSize: '14px',
            borderRadius: '4px',
          },
        });
      }

      return updatedItems;
    });
  }, [removeFromCart]);

  // Clear cart - optimized for instant response
  const clearCart = useCallback(() => {
    setCartItems([]);
    toast.success('Cart cleared', { 
      duration: 1000,
      position: 'top-right',
      style: {
        background: '#333',
        color: '#fff',
        padding: '4px 8px',
        fontSize: '14px',
        borderRadius: '4px',
      },
    });
  }, []);

  // Get total price - memoized
  const getTotalPrice = useCallback(() => {
    return formatPrice(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
  }, [cartItems]);

  // Get cart item count - memoized
  const getCartCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartCount,
    formatPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 