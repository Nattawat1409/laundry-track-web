import pg, { Connection } from 'pg'
const {pool} = pg

const pool = new pool({
    connectionString: process.env.DATABASE_URL
})

export default pool

const res = await pool.query('SELECT NOW()')
console.log(res.rows)