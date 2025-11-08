import { Pool } from 'pg'

const pool = new Pool(
    {
        host: 'localhost',
        user: 'postgres',
        password: '12345Syb.',
        database: 'p_1',
        port: 5432
    }
)

export default pool;