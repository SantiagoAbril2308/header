// src/context/CartContext.jsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// 1. Función para obtener el estado inicial desde localStorage
const getInitialCart = () => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('ecommerce_cart');
    // El carrito se guarda como: [{ productId: number, quantity: number }]
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // 2. Efecto para sincronizar el estado con localStorage cada vez que cambia
  useEffect(() => {
    // Solo guardar si estamos en el cliente
    if (typeof window !== 'undefined') {
        localStorage.setItem('ecommerce_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // --- 3. Lógica del Carrito (Funciones Mutadoras) ---

  const addToCart = (productId, quantity = 1) => {
    setCartItems(currentItems => {
      // Convertir el ID a string/number si es necesario, basado en cómo lo pasas desde la DB
      const existingItemIndex = currentItems.findIndex(item => item.productId === productId);

      if (existingItemIndex > -1) {
        // Si el producto ya existe, incrementa la cantidad
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
       
        return [...currentItems, { productId, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.productId !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(currentItems => 
      currentItems.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getTotalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};