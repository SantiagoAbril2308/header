// src/app/productos/page.jsx
import Image from 'next/image';
import Link from 'next/link';
// Importamos la conexión a la base de datos 'p_1'
import db from '@/lib/db';

// Función para obtener TODOS los productos de la tabla 'productos'
async function getAllProductsFromDB() {
  try {
    const query = `
      SELECT
        id_product, 
        nombre, 
        precio, 
        image_url
      FROM productos
      ORDER BY nombre ASC
    `;
    
    // Usamos las columnas de tu tabla
    const result = await db.query(query);
    return result.rows;
    
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    return []; 
  }
}

// Esta es la página del catálogo de clientes (Ruta: /productos)
export default async function ProductsListPage() {
  const products = await getAllProductsFromDB();

  return (
    <div className="container mx-auto p-4 md:p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-red-500 inline-block pb-1">
        Catálogo de Productos
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No hay productos en el catálogo.</p>
          <p className="text-sm text-gray-500 mt-2">Puedes añadir productos desde la página de Inicio/Admin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            // El Link apunta a la página de detalle dinámica
            <Link key={product.id_product} href={`/productos/${product.id_product}`} className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1">
                
                <div className="relative h-48 w-full">
                    <Image 
                      src={product.image_url || '/hola.jpg'} // Usa la imagen de tu DB o un placeholder
                      alt={product.nombre} 
                      fill 
                      style={{ objectFit: "cover" }}
                      className="group-hover:opacity-85 transition duration-300"
                      unoptimized 
                    />
                </div>
                
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 group-hover:text-red-600 transition truncate text-lg">
                    {product.nombre}
                  </h2>
                  <p className="text-xl font-bold text-red-600 mt-1">${parseFloat(product.precio).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}