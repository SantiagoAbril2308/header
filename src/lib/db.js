

import { Pool } from 'pg';

let pool;

if (!global._pgPool) {
    global._pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
pool = global._pgPool;

export default pool;