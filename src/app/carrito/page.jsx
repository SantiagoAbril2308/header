// src/app/cart/page.jsx
'use client';

import { useCart } from '@/hooks/CartContext'; // Asegúrate que la ruta es correcta
import { useState, useEffect, useMemo } from 'react';

// Define la estructura de datos que esperas de la DB
const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Obtener detalles de productos del servidor ---
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItems.length === 0) {
        setProductDetails([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      // Mapea los IDs únicos de los ítems en el carrito
      const productIds = cartItems.map(item => item.productId);

      try {
        // Llamada al API Route que consulta la base de datos
        const response = await fetch('/api/cart-products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds }),
        });

        if (!response.ok) {
          throw new Error('Error al cargar los detalles de los productos.');
        }

        const data = await response.json();
        setProductDetails(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [cartItems]); // Se ejecuta cada vez que el contenido del carrito (IDs y cantidades) cambia

  // --- 2. Combinar datos del carrito (estado) con datos de la DB (detalles) ---
  const cartData = useMemo(() => {
    return cartItems.map(item => {
      // Buscar el detalle del producto por su ID
      const details = productDetails.find(p => String(p.id_product) === String(item.productId));
      
      return {
        ...item, // { productId, quantity }
        details, // { id_product, nombre, precio, image_url, stock }
        totalPrice: details ? details.precio * item.quantity : 0,
      };
    }).filter(item => item.details); // Filtrar si el detalle no se encontró
  }, [cartItems, productDetails]);

  const cartTotal = useMemo(() => 
    cartData.reduce((sum, item) => sum + item.totalPrice, 0), 
    [cartData]
  );
  
  // --- 3. Renderizado ---

  if (isLoading) return <div className="p-8 text-center">Cargando carrito...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  if (cartData.length === 0) return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Tu carrito está vacío 😔</h1>
      <p className="mt-4"><a href="/productos" className="text-blue-600 hover:underline">Ir a la tienda</a></p>
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna de Items del Carrito */}
        <div className="lg:col-span-2 space-y-4">
          {cartData.map((item) => (
            <div key={item.productId} className="flex items-center border p-4 rounded-lg shadow-sm">
              {/* Contenido del Producto */}
              <img 
                src={item.details.image_url || '/placeholder.jpg'} 
                alt={item.details.nombre} 
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h2 className="font-semibold text-lg">{item.details.nombre}</h2>
                <p className="text-gray-600">Precio unitario: ${parseFloat(item.details.precio).toFixed(2)}</p>
              </div>
              
              {/* Controles de Cantidad */}
              <div className="flex items-center space-x-2 mx-4">
                <button 
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="font-medium w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              {/* Total del Item */}
              <div className="font-bold text-lg w-20 text-right">
                ${item.totalPrice.toFixed(2)}
              </div>

              
              <button 
                onClick={() => removeFromCart(item.productId)}
                className="ml-4 text-red-500 hover:text-red-700"
                aria-label={`Eliminar ${item.details.nombre}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Resumen de la Orden</h2>
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => alert('Procediendo al pago... ')}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-150 font-semibold mb-3"
          >
            Proceder al Pago
          </button>
          <button 
            onClick={clearCart}
            className="w-full text-red-600 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition duration-150"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;