'use client'; 

import { useState, useEffect } from 'react';

export default function Hombre() {
  
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //  Manejador de envío del formulario (Llama a la API POST)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSubmitting(true);

        // Limpieza y conversión de tipos antes de enviar
        const dataToSend = {
            ...newProduct,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock, 10)
        };
        
        try {
            const response = await fetch('/api/auth/login/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            
            const result = await response.json();

            if (response.status === 201) {
                setMessage(`Producto "${result.name}" creado con éxito!`);
                setNewProduct({ name: '', description: '', price: '', stock: '' }); 
               
            } else if (response.status === 409) {
                setMessage(` Error: ${result.message}`); 
            } else {
                setMessage(`Error al crear el producto: ${result.message || response.statusText}`);
            }

        } catch (error) {
            console.error('Fallo el envío del producto:', error);
            setMessage(' Error de conexión con el servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

     const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                
                const response = await fetch('/api/auth/login/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar los datos: ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data); // Guarda los datos en el estado

            } catch (err) {
                console.error("Fallo la carga de productos:", err);
                setError(err.message); // Guarda el mensaje de error
            } finally {
                setLoading(false); // Deja de mostrar el estado de carga
            }
        }

        fetchProducts();
    }, []); 


    return (
        <main className="main-background p-8 min-h-screen">
            <h1 className="text-white text-3xl mb-6">Administrar Productos (Hombre)</h1>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
                <h2 className="text-white text-2xl mb-4 border-b pb-2 border-gray-700">Crear Nuevo Producto</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label htmlFor="name" className="block text-gray-300">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={newProduct.name} 
                            onChange={handleChange} 
                            required 
                            className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-300">Descripción</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            value={newProduct.description} 
                            onChange={handleChange} 
                            className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="price" className="block text-gray-300">Precio</label>
                            <input 
                                type="number" 
                                id="price" 
                                name="price" 
                                value={newProduct.price} 
                                onChange={handleChange} 
                                required 
                                step="0.01"
                                className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="stock" className="block text-gray-300">Stock</label>
                            <input 
                                type="number" 
                                id="stock" 
                                name="stock" 
                                value={newProduct.stock} 
                                onChange={handleChange} 
                                required 
                                className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    
                    {message && (
                        <p className={`p-2 rounded text-center ${message.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                            {message}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded font-bold transition duration-150 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    >
                        {isSubmitting ? 'Guardando...' : 'Crear Producto'}
                    </button>
                </form>
            </div>
            
           <h1 className="text-white">Hombre ({products.length} productos)</h1>
            <div className="product-list grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="product-card bg-gray-800 p-4 rounded-lg shadow-lg text-white"
                    >
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-gray-400">{product.description}</p>
                        <p className="text-lg mt-2">Precio: ${product.price}</p>
                        <p className="text-sm">Stock: {product.stock}</p>
                    </div>
                ))}
                
                {products.length === 0 && (
                    <p className="text-white col-span-full">No se encontraron productos.</p>
                )}
            </div>
            
        </main>
    )
    
}

   
    