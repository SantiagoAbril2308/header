// src/components/Providers.jsx
'use client'; 

// La ruta relativa a tu contexto
import { CartProvider } from '../hooks/CartContext'; 

export default function Providers({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}