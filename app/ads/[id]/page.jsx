import Link from "next/link"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { getAdById } from "@/lib/ads"
import SelectedAdClient from "@/components/SelectedAd/SelectedAdClient"

export const dynamic = "force-dynamic"

export default async function AdDetailPage({ params }) {
  const [ad, session] = await Promise.all([getAdById(params.id), auth()])
  if (!ad) notFound()
  return <SelectedAdClient ad={ad} currentUserId={session?.user?.id} />
}
