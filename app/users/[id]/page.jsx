import Link from "next/link"
import { notFound } from "next/navigation"
import { LogOut, Mail, User as UserIcon, Hash } from "lucide-react"

import { requireUser } from "@/lib/auth"
import { getUserById } from "@/lib/ads"
import { logoutAction } from "@/lib/actions/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export const dynamic = "force-dynamic"

export default async function ProfilePage({ params }) {
  const sessionUser = await requireUser()
  const profile = await getUserById(params.id)
  if (!profile) notFound()

  const isSelf = String(profile.id) === String(sessionUser.id)
  const initials = (profile.name || "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                {initials || <UserIcon className="h-6 w-6" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isSelf ? "Your account" : "Profile"}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <dl className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </dt>
                <dd className="text-sm font-medium">{profile.email}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Hash className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  User ID
                </dt>
                <dd className="font-mono text-sm">{profile.id}</dd>
              </div>
            </div>
          </dl>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button asChild variant="outline">
              <Link href={`/users/${profile.id}/ads`}>
                {isSelf ? "My listings" : "Their listings"}
              </Link>
            </Button>
            {isSelf && (
              <form action={logoutAction}>
                <Button type="submit" variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
