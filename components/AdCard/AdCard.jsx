"use client"

import Link from "next/link"
import { DateTime } from "luxon"
import { Heart, Share2 } from "lucide-react"

import DropdownMenu from "../DropdownMenu/DropdownMenu"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function AdCard({ ad, currentUserId }) {
  const { id, title, summary, createdAt, userId, images, owner } = ad
  const coverUrl = images?.[0]?.src || "/apartment1.webp"

  const isMine = currentUserId != null && String(currentUserId) === String(userId)
  const initials = (owner?.name || "JD")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const localizedCreatedAt = createdAt
    ? DateTime.fromMillis(Number(createdAt)).toLocaleString(DateTime.DATE_MED)
    : null

  return (
    <Card
      id={String(id)}
      className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <Link
        href={`/ads/${id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
        aria-label={title}
      >
        <img
          src={coverUrl}
          alt={title || "Property photo"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute right-3 top-3 flex gap-1.5">
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
            aria-label="Save to favorites"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <CardContent className="flex-1 space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/ads/${id}`} className="min-w-0 flex-1">
            <h3 className="truncate font-display text-lg font-semibold leading-tight">
              {title}
            </h3>
          </Link>
          <DropdownMenu adId={id} isOwner={isMine} />
        </div>
        {summary ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">{summary}</p>
        ) : null}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-secondary text-[11px] text-secondary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          {localizedCreatedAt ? (
            <span className="text-xs text-muted-foreground">
              {localizedCreatedAt}
            </span>
          ) : null}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          aria-label="Share"
          onClick={(e) => e.preventDefault()}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
