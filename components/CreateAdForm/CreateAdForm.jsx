"use client"

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { ArrowLeft, PlusCircle } from "lucide-react"

import { createAdAction } from "@/lib/actions/ads"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Publishing…" : "Publish listing"}
    </Button>
  )
}

export default function CreateAdForm() {
  const [state, formAction] = useFormState(createAdAction, null)
  const fieldErrors = state?.fieldErrors || {}

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
        <Link href="/ads">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to listings
        </Link>
      </Button>

      <div className="mb-8 space-y-2 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PlusCircle className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          List a new property
        </h1>
        <p className="text-sm text-muted-foreground">
          Add the details below and publish your listing.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          <form action={formAction} className="space-y-6" noValidate encType="multipart/form-data">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Bright 2-bedroom apartment in the old town"
                aria-invalid={!!fieldErrors.title}
              />
              {fieldErrors.title && <ErrorMessage>{fieldErrors.title[0]}</ErrorMessage>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <textarea
                id="summary"
                name="summary"
                rows={2}
                placeholder="A short teaser for your listing"
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!fieldErrors.summary}
              />
              {fieldErrors.summary && <ErrorMessage>{fieldErrors.summary[0]}</ErrorMessage>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <textarea
                id="details"
                name="details"
                rows={6}
                placeholder="Describe the property, amenities, location…"
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!fieldErrors.details}
              />
              {fieldErrors.details && <ErrorMessage>{fieldErrors.details[0]}</ErrorMessage>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Photos</Label>
              <Input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                className="cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-sm file:font-medium file:text-secondary-foreground"
              />
              <p className="text-xs text-muted-foreground">
                Upload one or more photos of the property.
              </p>
            </div>

            {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button asChild type="button" variant="ghost">
                <Link href="/ads">Cancel</Link>
              </Button>
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
