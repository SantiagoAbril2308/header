import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyCredentials } from '@/lib/login';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email y contraseña son requeridos' }, { status: 400 });
        }

        // Verifica credenciales usando la función con bcrypt
        const isValid = await verifyCredentials(email, password);

        if (!isValid) {
            return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
        }

        // Obtén el usuario sin la contraseña
        const result = await pool.query('SELECT * FROM usuario WHERE nombre = $1', [email]);
        const user = result.rows[0];
        const { pass, ...userWithoutPassword } = user;

        return NextResponse.json({
            message: "Inicio de sesión exitoso",
            user: userWithoutPassword
        }, { status: 200 });

    } catch (error) {
        console.error('Error en la autenticación:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}