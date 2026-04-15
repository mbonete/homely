import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { z } from "zod"
import { eq } from "drizzle-orm"

import { authConfig } from "./auth.config.js"
import { db } from "./db/index.js"
import { users } from "./db/schema.js"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

async function verifyUser(email, password) {
  const [user] = db.select().from(users).where(eq(users.email, email)).all()
  if (!user) return null
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return null
  return { id: String(user.id), name: user.name, email: user.email }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw)
        if (!parsed.success) return null
        return verifyUser(parsed.data.email, parsed.data.password)
      },
    }),
  ],
})
