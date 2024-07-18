import { NextResponse } from "next/server";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWD,
    port: 5432,
});

export async function GET() {
    try {
        await client.connect();
        const query = 'SELECT id, email, display_name, role, mobile_number FROM users';
        const res = await client.query(query);
        await client.end();

        return NextResponse.json(res.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        await client.end();
        return new NextResponse("Internal Error", { status: 500 });
    }
}
