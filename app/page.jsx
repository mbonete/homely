import Link from "next/link"
import { Search, MapPin, Building2, Sparkles, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const features = [
  {
    icon: Sparkles,
    title: "Handpicked listings",
    description:
      "Every property is reviewed so you only browse places worth your time.",
  },
  {
    icon: ShieldCheck,
    title: "Verified owners",
    description: "Talk directly to owners and agents — no middlemen, no surprises.",
  },
  {
    icon: Building2,
    title: "From studios to villas",
    description:
      "Apartments, family homes, short stays — filter to exactly what you need.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Fresh listings every day
          </span>

          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Find a place that feels{" "}
            <span className="text-primary">like home</span>.
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Browse thousands of curated apartments, houses and short stays.
            Connect with owners directly and move in with confidence.
          </p>

          <form
            className="flex w-full max-w-xl flex-col gap-2 rounded-xl border border-border bg-background p-2 shadow-sm sm:flex-row sm:items-center"
            action="/ads"
            role="search"
          >
            <label htmlFor="hero-search" className="sr-only">
              Search by city or neighborhood
            </label>
            <div className="flex flex-1 items-center gap-2 px-3">
              <MapPin
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="hero-search"
                name="q"
                type="search"
                placeholder="City, neighborhood, or property name"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button type="submit" size="lg" className="sm:px-6">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>Popular:</span>
            <Link href="/ads" className="hover:text-foreground">
              Apartments
            </Link>
            <Link href="/ads" className="hover:text-foreground">
              Houses
            </Link>
            <Link href="/ads" className="hover:text-foreground">
              Studios
            </Link>
            <Link href="/ads" className="hover:text-foreground">
              Short stays
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why Homely
          </h2>
          <p className="mt-3 text-muted-foreground">
            A calmer way to search for your next place.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/80 px-8 py-16 text-center text-primary-foreground shadow-sm sm:px-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Got a property to list?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
            Reach renters and buyers in minutes. Create a listing for free.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/adform">List a property</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/ads">Browse listings</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
