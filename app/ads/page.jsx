import { listAds } from "@/lib/ads"
import { auth } from "@/auth"
import AdsGridClient from "@/components/AdsGrid/AdsGridClient"

export const dynamic = "force-dynamic"

export default async function AdsPage() {
  const [ads, session] = await Promise.all([listAds(), auth()])
  return (
    <AdsGridClient
      ads={ads}
      currentUserId={session?.user?.id}
      title="Browse properties"
    />
  )
}
