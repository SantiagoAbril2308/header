import pool from './db.js';
import bcrypt from 'bcrypt';

/**
 * @param {string} email El nombre de usuario a verificar.
 * @param {string} password La contraseña a verificar.
 * @returns {Promise<boolean>}
 */
export async function verifyCredentials(email, password) {
  const client = await pool.connect();
  try {
    
    const query = 'SELECT pass FROM usuario WHERE nombre = $1';
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      return false;
    }

    const storedHash = result.rows[0].password;

    const match = await bcrypt.compare(password, storedHash);
    
    return match;

  } catch (error) {
    console.error('Error al verificar las credenciales:', error);
    return false;
  } finally {
    client.release();
  }
}