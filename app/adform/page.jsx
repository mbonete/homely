import { requireUser } from "@/lib/auth"
import CreateAdForm from "@/components/CreateAdForm/CreateAdForm"

export default async function CreateAdPage() {
  await requireUser()
  return <CreateAdForm />
}
