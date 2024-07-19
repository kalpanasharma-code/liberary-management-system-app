import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
export const getDataFromToken = () => {
    try {
        const cookieStore = cookies()
        const encodedtoken = cookieStore.get('token')?.value || ''
        const decodedToken: any = jwt.verify(encodedtoken, process.env.JWT_SECRET || "")
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
            redirect('/login');
        }
        return String(decodedToken.userId)
    } catch (error: any) {
        console.log(error, "error")
        throw new Error(error.message)
    }
}