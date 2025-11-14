// hooks/useProductsData.js

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para cargar la lista de productos desde la API.
 * Gestiona los estados de carga, error y la lista de productos.
 *
 * @returns {{ products: Array<any>, loading: boolean, error: string | null, setProducts: Function }}
 */
export function useProductsData() {
    // Almacena todos los productos cargados
    const [products, setProducts] = useState([]); 
    // Indica si la carga está en curso
    const [loading, setLoading] = useState(true); 
    // Almacena cualquier error que ocurra durante la carga
    const [error, setError] = useState(null); 

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Llama al endpoint GET de tu API
                const response = await fetch('/api/auth/login/products', { 
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar los datos: ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data); 

            } catch (err) {
                console.error("Fallo la carga de productos:", err);
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        }

        fetchProducts();
    }, []); // Ejecuta solo una vez

    // Retorna los estados y la función para actualizar los productos
    return { products, loading, error, setProducts };
}