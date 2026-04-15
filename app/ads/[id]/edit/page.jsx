import { notFound, redirect } from "next/navigation"
import { requireUser } from "@/lib/auth"
import { getAdById } from "@/lib/ads"
import EditAdForm from "@/components/EditAdForm/EditAdForm"

export const dynamic = "force-dynamic"

export default async function EditAdPage({ params }) {
  const user = await requireUser()
  const ad = await getAdById(params.id)
  if (!ad) notFound()
  if (String(ad.userId) !== String(user.id)) redirect(`/ads/${params.id}`)
  return <EditAdForm ad={ad} />
}
