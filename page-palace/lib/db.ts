import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWD,
    port: 5432,
});

export async function connect() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }
}

export async function disconnect() {
    try {
        await client.end();
        console.log('Disconnected from PostgreSQL');
    } catch (error) {
        console.error('Error disconnecting from PostgreSQL:', error);
    }
}

export default client;
