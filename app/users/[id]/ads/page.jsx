import Link from "next/link"
import { notFound } from "next/navigation"
import { PlusCircle, Home as HomeIcon } from "lucide-react"

import { auth } from "@/auth"
import { getUserById, listAdsByUser } from "@/lib/ads"
import AdsList from "@/components/AdsList/AdsList"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function UserAdsPage({ params }) {
  const owner = await getUserById(params.id)
  if (!owner) notFound()

  const [userAds, session] = await Promise.all([
    listAdsByUser(params.id),
    auth(),
  ])
  const isSelf = session?.user?.id && String(session.user.id) === String(owner.id)
  const title = isSelf ? "My listings" : `${owner.name}'s listings`

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title={title}
        description={`${userAds.length} ${userAds.length === 1 ? "listing" : "listings"}`}
        action={
          isSelf ? (
            <Button asChild>
              <Link href="/adform">
                <PlusCircle className="mr-2 h-4 w-4" />
                List property
              </Link>
            </Button>
          ) : null
        }
      />

      <div className="mt-8">
        {userAds.length === 0 ? (
          <EmptyState
            icon={HomeIcon}
            title="No listings yet"
            description={
              isSelf
                ? "Create your first property listing to get started."
                : "This user hasn't posted any listings yet."
            }
            action={
              isSelf ? (
                <Button asChild>
                  <Link href="/adform">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    List property
                  </Link>
                </Button>
              ) : null
            }
          />
        ) : (
          <AdsList ads={userAds} currentUserId={session?.user?.id} />
        )}
      </div>
    </div>
  )
}
