"use client"

import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Home } from "lucide-react"

import { signupAction } from "@/lib/actions/auth"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import ImageGallery from "../ImageGallery/ImageGallery"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating account…" : "Sign up"}
    </Button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signupAction, null)
  const fieldErrors = state?.fieldErrors || {}

  return (
    <div className="grid min-h-[calc(100vh-4rem)] w-full lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Home className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-semibold">Homely</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Join Homely to list properties and save your favorites.
            </p>
          </div>

          <form action={formAction} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                autoFocus
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={!!fieldErrors.name}
              />
              {fieldErrors.name && <ErrorMessage>{fieldErrors.name[0]}</ErrorMessage>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && <ErrorMessage>{fieldErrors.email[0]}</ErrorMessage>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 5 characters"
                aria-invalid={!!fieldErrors.password}
              />
              {fieldErrors.password && <ErrorMessage>{fieldErrors.password[0]}</ErrorMessage>}
            </div>

            {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}

            <SubmitButton />
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 p-6">
          <ImageGallery />
        </div>
      </div>
    </div>
  )
}
