"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Home } from "lucide-react";

import { loginAction } from "@/lib/actions/auth";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in…" : "Log in"}
    </Button>
  );
}

export default function LogInForm() {
  const [state, formAction] = useActionState(loginAction, null);
  const fieldErrors = state?.fieldErrors || {};

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="flex items-center justify-center py-12 lg:pr-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to browse, save, and list properties.
            </p>
          </div>

          <form action={formAction} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoFocus
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && (
                <ErrorMessage>{fieldErrors.email[0]}</ErrorMessage>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!fieldErrors.password}
              />
              {fieldErrors.password && (
                <ErrorMessage>{fieldErrors.password[0]}</ErrorMessage>
              )}
            </div>

            {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}

            <SubmitButton />
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign up
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
  );
}
