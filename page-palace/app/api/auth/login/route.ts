import { z } from 'zod';
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { generateToken } from '../../../utils/auth';
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWD,
    port: 5432,
});

export async function POST(req: Request, res: NextResponse) {
    try {
        await client.connect();
        const data = await req.json();
        const { email, password } = schema.parse(data);

        if (!email || !password) {
            return new NextResponse('Invalid request. Email and password are required.', { status: 400 });
        }

        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const values = [email];
            const result = await client.query(query, values);
            const user = result.rows[0];

            if (!user) {
                return new NextResponse('Invalid credentials', { status: 401 });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return new NextResponse('Invalid credentials', { status: 403 });
            }

            const tokenPayload = {
                userId: user.id,
                userEmail: user.email,
            };
            const token = generateToken(res, tokenPayload);
            const response = NextResponse.json({ user, token });
            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });

            await client.end();
            return response;
        } catch (error) {
            console.error('Error logging in:', error);
            await client.end();
            return new NextResponse('Internal Error', { status: 500 });
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        await client.end();
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}
