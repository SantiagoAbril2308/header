'use client'; 

import React, { useState, useEffect, useMemo } from 'react';
import { useProductsData } from '../../hooks/useProducts';

export const categories = [
    "Todos", 
    "Hombre", 
    "Mujer", 
    "Unisex", 
];

const AdminCatalogo = () => {
   
    const { products, loading, error, setProducts } = useProductsData();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
 
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        category: 'Hombre',
        price: '',
        stock: ''
    });

    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filtroProducts = useMemo(() => {
        let list = products;

        // Filtrado por categoria
        if (activeCategory !== 'Todos') {
            list = list.filter(product => product.category === activeCategory);
        }

        // Filtrado por búsqueda en nombre
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            list = list.filter(product =>
                (product.name || product.nombre).toLowerCase().includes(lowerCaseSearch)
            );
        }
        
        return list;
    }, [activeCategory, searchTerm, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSubmitting(true);

        const dataToSend = {
            ...newProduct,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock, 10)
        };
        
        if (isNaN(dataToSend.price) || isNaN(dataToSend.stock)) {
             setMessage('Error: El precio y el stock deben ser números válidos.');
             setIsSubmitting(false);
             return;
        }

        try {
            // Envía los datos al servidor para inserción en PostgreSQL
            const response = await fetch('/api/auth/login/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
            
            const result = await response.json();

            if (response.status === 201) {
            
                setProducts(prev => [...prev, result]); 

                setMessage(`✅ Producto "${result.name || dataToSend.name}" creado y guardado con éxito!`);
               
                setNewProduct({ name: '', description: '', category: 'Hombre', price: '', stock: '' }); 
                
            } else if (response.status === 409) {
                setMessage(`Error (409): El producto ya existe. ${result.message}`); 
            } else {
                setMessage(`Error al crear: ${result.message || response.statusText}`);
            }

        } catch (error) {
            console.error('Fallo el envío del producto:', error);
            setMessage('Error de conexión con el servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Los estados loading y error vienen del hook
    if (loading) return <div className="container mx-auto p-4 md:p-8 text-center text-gray-700">Cargando productos de PostgreSQL...</div>;
    if (error) return <div className="container mx-auto p-4 md:p-8 text-center text-red-600">Error al cargar: {error}</div>;

    return (
        <div className="container mx-auto p-4 md:p-8 ">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
                🛒 Catálogo y Administración de Productos
            </h1>
           {/* 
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xl mx-auto mb-10 border-t-4 border-indigo-600">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear Nuevo Producto</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={newProduct.name} 
                            onChange={handleChange} 
                            required 
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            value={newProduct.description} 
                            onChange={handleChange} 
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                 
                    <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                >
                                    {categories.slice(1).map(cat => ( // Excluye "Todos"
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio ($)</label>
                                <input 
                                    type="number" 
                                    id="price" 
                                    name="price" 
                                    value={newProduct.price} 
                                    onChange={handleChange} 
                                    required 
                                    step="0.01"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                                <input 
                                    type="number" 
                                    id="stock" 
                                    name="stock" 
                                    value={newProduct.stock} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                    </div>
                    
                    {message && (
                        <p className={`p-3 rounded text-center font-medium ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded-lg font-bold text-white transition duration-150 ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} shadow-md`}
                    >
                        {isSubmitting ? 'Guardando en PostgreSQL...' : 'Crear Producto'}
                    </button>
                </form>
            </div>
*/}
            <hr className="mb-10"/>

            {/* --- SECCIÓN DE FILTROS Y BÚSQUEDA --- */}
            <div className="mb-8 w-full max-w-lg mx-auto">
                <input
                    type="text"
                    placeholder="Buscar producto por nombre..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex justify-center mb-10 overflow-x-auto p-2 scrollbar-hide">
                <div className="flex space-x-3 sm:space-x-5 whitespace-nowrap">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setActiveCategory(category);
                                setSearchTerm(''); 
                            }}
                            className={`
                                px-5 py-2 rounded-full text-sm font-semibold transition duration-200 shadow-sm
                                ${activeCategory === category
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* --- SECCIÓN DE LISTADO DE PRODUCTOS --- */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b pb-2">
                Productos {activeCategory !== 'Todos' ? `de ${activeCategory}` : 'en Catálogo'} ({filtroProducts.length})
            </h2>
            
            {filtroProducts.length === 0 ? (
                <p className="text-center text-gray-500 text-lg p-10 bg-gray-50 rounded-lg">
                    No se encontraron productos que coincidan con los filtros aplicados.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtroProducts.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="p-5">
                                <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full mb-2 inline-block">
                                    {product.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    {/* Mostrar precio y stock */}
                                    <span className="text-2xl font-extrabold text-green-600">${product.price}</span>
                                    <span className="text-sm font-semibold text-gray-500">Stock: {product.stock || 0}</span>
                                    
                                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 shadow-md">
                                        Ver Detalle
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCatalogo;