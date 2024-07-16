import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface TokenPayload {
    userId: number;
    userEmail: string;
}

const generateToken = (res: NextResponse, payload: TokenPayload) => {
    const jwtSecret = process.env.JWT_SECRET || "";
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "7d",
    });
    return token;
};
export { generateToken };
