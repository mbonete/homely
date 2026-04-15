"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, Pencil, Trash2, Flag, User } from "lucide-react"

import AlertDialog from "../AlertDialog/AlertDialog"
import {
  DropdownMenu as ShadDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { deleteAdAction } from "@/lib/actions/ads"

export default function DropdownMenu({ adId, isOwner }) {
  const router = useRouter()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const onConfirmationResponse = async (confirmed) => {
    setIsDeleteOpen(false)
    if (confirmed === true) {
      setIsDeleting(true)
      try {
        await deleteAdAction(adId)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <>
      <ShadDropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Ad actions"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          {isOwner ? (
            <>
              <DropdownMenuItem
                onSelect={() => router.push(`/ads/${adId}/edit`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                disabled={isDeleting}
                onSelect={(e) => {
                  e.preventDefault()
                  setIsDeleteOpen(true)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onSelect={() => router.push("/ads")}>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push("/ads")}>
                <User className="mr-2 h-4 w-4" />
                View profile
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </ShadDropdownMenu>
      {isDeleteOpen && (
        <AlertDialog
          question="Delete this ad?"
          description="This ad will be permanently removed. This action cannot be undone."
          onResponse={onConfirmationResponse}
        />
      )}
    </>
  )
}
