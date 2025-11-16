'use client';

import React, { useState } from 'react';
// Ruta relativa a tu contexto
import { useCart } from '../hooks/CartContext'; 

export default function AddButton({ productId, stock }) {
  // Ahora useCart tiene acceso a addToCart, la cual llama al toast
  const { addToCart } = useCart(); 
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = stock > 0 ? stock : 1; 

  const handleAddToCart = () => {
    // 🌟 La lógica del Toast y la actualización del contador están ahora en el Contexto 🌟
    addToCart(productId, quantity);
    // Ya no es necesario el console.log aquí.
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newQty = prev + delta;
      if (newQty < 1) return 1;
      if (newQty > maxQuantity) return maxQuantity;
      return newQty;
    });
  };

  const isAvailable = stock > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {/* Selector de Cantidad */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={!isAvailable || quantity <= 1}
            className="px-4 py-2 text-xl font-bold text-gray-700 disabled:opacity-50"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="w-16 text-center py-2 border-l border-r border-gray-300 font-bold focus:outline-none"
            min="1"
            max={maxQuantity}
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={!isAvailable || quantity >= maxQuantity}
            className="px-4 py-2 text-xl font-bold text-gray-700 disabled:opacity-50"
          >
            +
          </button>
        </div>
        
        {/* Botón de Agregar al Carrito */}
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`flex-grow py-3 px-6 text-white font-bold text-lg rounded-lg shadow-xl transition duration-300 transform ${
            isAvailable 
              ? 'bg-red-600 hover:bg-red-700 hover:scale-[1.01]' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          🛒 {isAvailable ? `Añadir ${quantity} al Carrito` : 'Agotado'}
        </button>
      </div>
      {!isAvailable && (
        <p className="text-red-500 font-semibold">Producto actualmente agotado.</p>
      )}
    </div>
  );
}