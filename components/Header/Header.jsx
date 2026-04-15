import { auth } from "@/auth"
import HeaderClient from "./HeaderClient"

export default async function Header() {
  const session = await auth()
  const user = session?.user
    ? { id: session.user.id, name: session.user.name }
    : null
  return <HeaderClient user={user} />
}
