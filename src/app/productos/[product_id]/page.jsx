// src/app/productos/[product_id]/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';

// Función para obtener datos de UN producto desde PostgreSQL
async function getProductDataFromDB(productId) {
  try {
    // 1. Consulta Principal del Producto
    const productQuery = `
      SELECT
        id_product,
        nombre,
        precio,
        stock,
        descripcion,
        image_url, 
        related_ids
      FROM productos 
      WHERE id_product = $1
    `;
    
    // Usamos las columnas de tu tabla
    const result = await db.query(productQuery, [productId]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const product = result.rows[0];
    
    // 2. Consulta de Productos Relacionados
    product.relatedProducts = [];
    if (product.related_ids && product.related_ids.length > 0) {
        const relatedQuery = `
            SELECT id_product, nombre, precio, image_url
            FROM productos
            -- CORRECCIÓN: Comparamos con un array de INTEGERs
            WHERE id_product = ANY($1::integer[]) 
        `;
        const relatedResult = await db.query(relatedQuery, [product.related_ids]);
        product.relatedProducts = relatedResult.rows;
    }
    
    // 3. Formato de Descripción
    if (typeof product.descripcion === 'string') {
        product.descripcion = product.descripcion.split('\n');
    }

    return product;
    
  } catch (error) {
    console.error('Error al obtener producto de PostgreSQL:', error);
    return null; 
  }
}

// Componente de Página de Detalle (Cumple la actividad)
export default async function ProductDetailPage({ params }) {
  const { product_id } = params;
  const product = await getProductDataFromDB(product_id);

  if (!product) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-red-600">Producto no encontrado.</h1>
      </div>
    );
  }

  // REQUERIMIENTO: Derivar Disponibilidad del 'stock'
  const availability = (product.stock > 0) ? 'En Stock' : 'Agotado';

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-10">
        
        {/* REQUERIMIENTO: Estructura (Dos columnas, responsivo) */}
        <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-xl shadow-2xl">
          
          {/* Lado Izquierdo: Imagen Principal */}
          <div className="md:w-1/2 lg:w-2/5 flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200">
              {/* REQUERIMIENTO: Imagen principal del producto */}
              <Image
                src={product.image_url || '/hola.jpg'} // De la DB
                alt={product.nombre}
                fill
                style={{ objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-500"
                unoptimized 
              />
            </div>
          </div>
          
          {/* Lado Derecho: Información y CTA */}
          <div className="md:w-1/2 lg:w-3/5 space-y-6">
            
            {/* REQUERIMIENTO: Nombre o título */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {product.nombre}
            </h1>
            
            {/* REQUERIMIENTO: Precio y disponibilidad */}
            <div className="flex items-baseline space-x-4 border-b pb-4">
              {/* Tu precio es INTEGER, lo formateamos */}
              <p className="text-4xl font-bold text-red-600">${parseFloat(product.precio).toFixed(2)}</p>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                availability === 'En Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {availability} (Stock: {product.stock})
              </span>
            </div>

            {/* REQUERIMIENTO: Botón para agregar al carrito */}
            <button className="w-full py-4 px-6 bg-red-600 text-white font-bold text-xl rounded-lg shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-[1.01]">
              🛒 Agregar al Carrito
            </button>
            
            {/* REQUERIMIENTO: Descripción detallada */}
            <section className="pt-4 border-t">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción Detallada</h2>
              {Array.isArray(product.descripcion) && product.descripcion.map((line, index) => (
                  <p key={index} className={`text-gray-700 ${line.startsWith('•') ? 'ml-4' : 'mb-2'}`}>
                      {line}
                  </p>
              ))}
            </section>
            
          </div>
        </div>
        
        {/* REQUERIMIENTO: Sección de productos relacionados */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-red-500 inline-block pb-1">
                Productos Relacionados
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {product.relatedProducts.map((related) => (
                  <Link key={related.id_product} href={`/productos/${related.id_product}`} className="group block">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl hover:scale-[1.02]">
                      <div className="relative h-48 w-full">
                          <Image src={related.image_url || '/hola.jpg'} alt={related.nombre} fill style={{ objectFit: "cover" }} unoptimized/>
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-gray-800 group-hover:text-red-600 transition truncate">
                          {related.nombre}
                        </p>
                        <p className="text-lg font-bold text-red-600 mt-1">${parseFloat(related.precio).toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
        )}
        
      </div>
    </div>
  );
}