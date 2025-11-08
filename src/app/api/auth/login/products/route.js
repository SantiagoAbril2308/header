import pool from '@/lib/db'; 

// ----------------------------------------------------------------------
// --- POST: CREAR PRODUCTO (Ajustado para usar 'precio' en lugar de 'valor') ---
// ----------------------------------------------------------------------
export async function POST(req) {
    try {
        // Recibimos category, description, price, name, stock
        const { name, description, price, stock, category } = await req.json(); 

        // 1. Verificación de unicidad
        const verifyProduct = await pool.query(
            'SELECT id_product FROM productos WHERE nombre = $1', 
            [name]
        );

        if (verifyProduct.rows.length > 0) {
            return Response.json({ message: 'El nombre ya se encuentra en uso' }, { status: 409 });
        }
        
        // 2. Inserción en la Base de Datos
        // Usamos las columnas más probables: nombre, descripcion, precio, stock, categoria
        // **IMPORTANTE**: Si tu columna de precio se llama 'valor' en la base de datos, ¡avísame!
        const result = await pool.query(
            `INSERT INTO productos 
                (nombre, descripcion, precio, stock, categoria) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id_product, nombre, descripcion, precio, stock, categoria`,
            [name, description, price, stock, category] 
        );
        
        // 3. Mapeo del resultado para el frontend (formato en inglés)
        const newProduct = result.rows[0];

        return Response.json({
            id: newProduct.id_product,
            name: newProduct.nombre,
            description: newProduct.descripcion,
            price: parseFloat(newProduct.precio),
            stock: parseInt(newProduct.stock, 10),
            category: newProduct.categoria
        }, { status: 201 });

    } catch (error) {
        console.error("Error al registrar el producto:", error);
        return new Response('Error al registrar el producto', { status: 500 });
    }
}

// ----------------------------------------------------------------------
// --- GET: OBTENER TODOS LOS PRODUCTOS (Ajustado para usar 'precio' en lugar de 'valor') ---
// ----------------------------------------------------------------------
export async function GET(req) {
    try {
        // 1. Seleccionamos todos los productos, usando las columnas de la BD y alias para el frontend
        const result = await pool.query(
            `SELECT 
                id_product AS id, 
                nombre AS name, 
                descripcion AS description, 
                precio AS price, 
                stock,
                categoria AS category
             FROM productos`
        );
        
        return Response.json(result.rows);

    } catch (error) {
        console.error("Error al obtener los productos:", error);
        // Si la columna 'precio' no existe, este código generará el mismo error, pero mencionando 'precio'
        return new Response('Error al obtener los productos', { status: 500 });
    }
}