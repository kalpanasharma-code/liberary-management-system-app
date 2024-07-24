import { NextResponse } from "next/server";
import { Client } from "pg";
import dotenv from "dotenv";
import { presentProfile } from "@/lib/profile";

dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWD,
    port: 5432
});

export async function PATCH(req: Request) {
    try {
        await client.connect();
        const data = await req.json();
        const { email, name, number } = data;
        const { id } = await presentProfile();
        if (!id || !email || !name || !number) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const query = `
            UPDATE users
            SET email = $1, display_name = $2, mobile_number = $3
            WHERE id = $4
            RETURNING *;
        `;
        const values = [email, name, number, id];

        const res = await client.query(query, values);
        await client.end();

        const updatedUser = res.rows[0];
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        await client.end();
        return new NextResponse("Internal Error", { status: 500 });
    }
}
