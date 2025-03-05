"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginButton() {
    const { data: session } = useSession()

    return session ? (
        <button onClick={() => signOut()}>Sign Out</button>
    ) : (
        <button onClick={() => signIn()}>Sign In</button>
    )
}
