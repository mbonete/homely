import Link from "next/link"
import {
  ArrowRight,
  Building2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/auth"
import { listAds } from "@/lib/ads"
import AdsList from "@/components/AdsList/AdsList"

export const dynamic = "force-dynamic"

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

const heroCollage = [
  { src: "/apartment2.webp", className: "col-span-2 row-span-2" },
  { src: "/apartment4.webp", className: "" },
  { src: "/apartment5.webp", className: "" },
  { src: "/apartment1.webp", className: "" },
  { src: "/apartment7.webp", className: "" },
]

export default async function HomePage() {
  const [allAds, session] = await Promise.all([listAds(), auth()])
  const featuredAds = allAds.slice(0, 6)

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="flex flex-col items-start gap-6 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Fresh listings every day
            </span>

            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find a place that feels{" "}
              <span className="text-primary">like home</span>.
            </h1>

            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
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

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
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

          <div className="hidden lg:block">
            <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-3 rounded-2xl">
              {heroCollage.map(({ src, className }) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-xl bg-muted ${className}`}
                >
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuredAds.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Featured properties
              </h2>
              <p className="text-muted-foreground">
                A handful of places hitting the market this week.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="self-start sm:self-auto">
              <Link href="/ads">
                View all listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10">
            <AdsList ads={featuredAds} currentUserId={session?.user?.id} />
          </div>
        </section>
      )}

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="mx-auto mb-20 mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
