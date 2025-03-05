import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/Users"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    await connectDB()

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    return NextResponse.json({ message: "User registered successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
