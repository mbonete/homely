"use server"

import { z } from "zod"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { AuthError } from "next-auth"

import { db } from "@/db"
import { users } from "@/db/schema"
import { signIn, signOut } from "@/auth"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
})

export async function loginAction(_prevState, formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors }
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/ads",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Invalid email or password" }
    }
    throw error
  }
}

export async function signupAction(_prevState, formData) {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { name, email, password } = parsed.data

  const [existing] = db.select().from(users).where(eq(users.email, email)).all()
  if (existing) {
    return { ok: false, error: "An account with that email already exists" }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  db.insert(users).values({ name, email, passwordHash }).run()

  try {
    await signIn("credentials", { email, password, redirectTo: "/ads" })
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Account created but sign-in failed" }
    }
    throw error
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" })
}
