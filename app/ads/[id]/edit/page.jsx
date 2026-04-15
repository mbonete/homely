import { notFound, redirect } from "next/navigation"
import { requireUser } from "@/lib/auth"
import { getAdById } from "@/lib/ads"
import EditAdForm from "@/components/EditAdForm/EditAdForm"

export const dynamic = "force-dynamic"

export default async function EditAdPage({ params }) {
  const { id } = await params
  const user = await requireUser()
  const ad = await getAdById(id)
  if (!ad) notFound()
  if (String(ad.userId) !== String(user.id)) redirect(`/ads/${id}`)
  return <EditAdForm ad={ad} />
}
