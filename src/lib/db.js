import { Pool } from 'pg'

const pool = new Pool(
    {
        host: 'localhost',
        user: 'postgres',
        password: '251106',
        database: 'ecommerce',
        port: 5432
    }
)

export default pool;