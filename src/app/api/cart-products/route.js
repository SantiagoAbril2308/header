// src/app/api/cart-products/route.js
import { NextResponse } from 'next/server';

import db from '@/lib/db'; 

export async function POST(request) {
  try {
    const { productIds } = await request.json();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    
    const cleanProductIds = productIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

    if (cleanProductIds.length === 0) {
         return NextResponse.json({ products: [] }, { status: 200 });
    }
    
    const placeholders = cleanProductIds.map((_, index) => `$${index + 1}`).join(', ');

    // Ejecutar la consulta SQL usando el nombre de columna id_product
    const query = `
      SELECT id_product, nombre, precio, image_url, stock 
      FROM productos 
      WHERE id_product IN (${placeholders});
    `;

    // Los cleanProductIds se usan como los valores para los placeholders
    const result = await db.query(query, cleanProductIds);
    
    // La respuesta contiene la lista de productos con sus detalles
    return NextResponse.json({ products: result.rows }, { status: 200 });

  } catch (error) {
    console.error('Error al obtener productos del carrito desde la DB:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al consultar productos.' },
      { status: 500 }
    );
  }
}