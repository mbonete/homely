"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DateTime } from "luxon"
import {
  ArrowLeft,
  Calendar,
  Heart,
  MessageCircle,
  Pencil,
  Share2,
  Trash2,
  User as UserIcon,
} from "lucide-react"

import { deleteAdAction } from "@/lib/actions/ads"
import AlertDialog from "../AlertDialog/AlertDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function SelectedAdClient({ ad, currentUserId }) {
  const router = useRouter()
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner =
    currentUserId != null && String(currentUserId) === String(ad.userId)

  const imageUrls =
    ad.images && ad.images.length > 0
      ? ad.images.map((img) => img.src)
      : ["/apartment1.jpg"]
  const activeImage = imageUrls[activeImageIdx] || imageUrls[0]

  const localizedCreatedAt = ad.createdAt
    ? DateTime.fromMillis(Number(ad.createdAt)).toLocaleString(DateTime.DATE_FULL)
    : null

  const onDelete = async (confirmed) => {
    setIsDeleteOpen(false)
    if (confirmed === true) {
      setIsDeleting(true)
      try {
        await deleteAdAction(ad.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
        <Link href="/ads">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to listings
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={activeImage}
              alt={ad.title || "Property photo"}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          {imageUrls.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {imageUrls.map((url, idx) => (
                <button
                  key={url + idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`overflow-hidden rounded-md border-2 transition ${
                    idx === activeImageIdx
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={url}
                    alt=""
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {ad.title}
            </h1>
            {ad.summary && (
              <p className="mt-3 text-lg text-muted-foreground">{ad.summary}</p>
            )}
            {localizedCreatedAt && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Listed {localizedCreatedAt}
              </div>
            )}

            <Separator className="my-8" />

            <section>
              <h2 className="font-display text-xl font-semibold">
                About this place
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/90 sm:text-base">
                {ad.details || "No additional details provided."}
              </p>
            </section>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <UserIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Listed by
                  </p>
                  <p className="font-semibold">
                    {isOwner ? "You" : ad.owner?.name || "Property owner"}
                  </p>
                </div>
              </div>

              <Separator />

              {isOwner ? (
                <div className="flex flex-col gap-2">
                  <Button onClick={() => router.push(`/ads/${ad.id}/edit`)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit listing
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete listing
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact owner
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                      <Heart className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {isDeleteOpen && (
        <AlertDialog
          question="Delete this ad?"
          description="This listing will be permanently removed. This action cannot be undone."
          onResponse={onDelete}
        />
      )}
    </div>
  )
}
