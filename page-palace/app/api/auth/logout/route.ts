import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    try {
        const response = new NextResponse('Logout successful', { status: 200 });
        response.cookies.set('token', '', {
            httpOnly: true, expires: new Date(0)
        })
        return response
    } catch (error) {
        console.error('Error Logging out:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}