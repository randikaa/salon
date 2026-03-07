import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "password"; // Minimal mock credentials 

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Set an HTTP-only cookie using the Next.js cookies API
            const cookieStore = await cookies();
            cookieStore.set("auth_token", "mock_secure_token_12345", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                // Expire in 24 hours
                maxAge: 60 * 60 * 24,
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    return NextResponse.json({ success: true });
}
