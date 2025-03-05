"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")  // State for email
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),  // Include email in request
            })

            if (!res.ok) {
                throw new Error("Registration failed")
            }

            router.push("/login") // Redirect to login after successful registration
        } catch (error) {
            setError("Failed to register. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <Card className="w-[350px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Input
                            type="email"  // Set type to email
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Registering..." : "Sign Up"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
