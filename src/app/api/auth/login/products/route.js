import pool from '@/lib/db';


export async function POST(req) {
    try {
        const { name, description, price, stock } = await req.json();

        const verifyProduct = await pool.query(
            'SELECT id from products WHERE name = $1', [name]
        )

        if(verifyProduct.rows.length > 0){
            return Response.json({message: 'El nombre ya se encuntra en uso'}, {status: 200})
        }

        const result = await pool.query(
            'INSERT INTO products ( name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING id, name, description, price, stock',
            [name, description, price, stock]
        );

        return  Response.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response('Error al registrar el usuario', { status: 500 });
    }
}

    
export async function GET(req) {
    try {
        
        const result = await pool.query(
            'SELECT id, name, description, price, stock FROM products'
        );

        
        return Response.json(result.rows);

    } catch (error) {
        console.error("Error al obtener los productos:", error);
        
        
        return new Response('Error al obtener los productos');
    }
}