import pg from "pg";
import env from "dotenv";

env.config();

console.log("Password: ", process.env.PG_PASSWORD);
const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

db.connect();

export default db;