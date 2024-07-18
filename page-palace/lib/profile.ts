import { Client } from 'pg';
import { getDataFromToken } from './getDataFromtoken';

export const presentProfile = async () => {
    try {
        const userId = getDataFromToken();
        if (!userId) {
            return null;
        }

        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB,
            password: process.env.DB_PASSWD,
            port: 5432,
        });

        await client.connect();

        const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
        const values = [userId];

        const result = await client.query(query, values);

        await client.end(); // Disconnect from the database

        return result.rows[0]; // Assuming you expect only one profile or null
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw new Error("Authentication failed");
    }
};
