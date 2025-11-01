

'use client'; 

// Lista de categorias
export const categories = [
  "Todos", 
  "Hombre", 
  "Mujer", 
  "Unisex", 
  
];
// Lista de productos
export const products = [
  { id: 1, name: "Pantalon Ancho", category: "Hombre", price: 200, description: "Potencia y portabilidad." },
  { id: 2, name: "Camiseta de Algodón", category: "Hombre", price: 105, description: "Suave y cómoda." },
  { id: 3, name: "Blusa", category: "Mujer", price: 65, description: "Cocina sin problemas." },
  { id: 4, name: "Falda", category: "Mujer", price: 150, description: "Imágenes nítidas." },
  { id: 5, name: "Saco", category: "Unisex", price: 270, description: "Estilo veraniego." },
  { id: 6, name: "Gorra", category: "Unisex", price: 45, description: "Una aventura épica." },
];
// Componente de optimizado
import React, { useState, useMemo } from 'react';

const CatalogoProductos = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filtroProducts = useMemo(() => {
    let list = products;
// Filtrado por categoria
    if (activeCategory !== 'Todos') {
      list = list.filter(product => product.category === activeCategory);
    }

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      list = list.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    return list;
  }, [activeCategory, searchTerm]);
// Renderizado del componente
  return (
    <div className="container mx-auto p-4 md:p-8 ">
      
   
      <div className="mb-8 w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
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
                px-5 py-2 rounded-full text-sm font-semibold transition duration-200
                ${activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Productos Disponibles</h2>
      
      {filtroProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtroProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-[oklch(95%_0.052_163.051)] rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-5">
                <span className="text-xs font-medium text-indigo-600 bg-[oklch(87.1%_0.15_154.449)] px-3 py-1 rounded-full mb-2 inline-block">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-extrabold text-green-600">${product.price}</span>
                  <button className="bg-[oklch(59.6%_0.145_163.225)] text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200">
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

export default CatalogoProductos;