import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/Users"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB()

        // Check if the user exists in MongoDB during login
        const user = await User.findOne({ username: credentials?.username })
        if (!user) {
          return null
        }

        // Compare hashed password with provided password
        const isValidPassword = await bcrypt.compare(credentials!.password, user.password)
        if (!isValidPassword) {
          return null
        }

        return { id: user._id.toString(), name: user.username, email: user.email }
      },
    }),
    CredentialsProvider({
      name: "Register",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password || !credentials?.email) {
          return null
        }

        await connectDB()

        // Check if the user already exists
        const existingUser = await User.findOne({ username: credentials.username })
        if (existingUser) {
          return null
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(credentials.password, 10)

        // Create and save new user to MongoDB
        const newUser = new User({
          username: credentials.username,
          email: credentials.email,
          password: hashedPassword,
        })
        await newUser.save()

        // Return the new user info (without password)
        return {
          id: newUser._id.toString(),
          name: newUser.username,
          email: newUser.email,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to the login page
    newUser: "/register", // Optional: Can add custom page for successful registration
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
