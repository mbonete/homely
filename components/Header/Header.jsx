import Link from "next/link"
import { Home, Menu, PlusCircle, LogOut, User as UserIcon } from "lucide-react"

import { auth } from "@/auth"
import { logoutAction } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default async function Header() {
  const session = await auth()
  const user = session?.user
  const isLoggedIn = !!user
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : ""

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-foreground"
            aria-label="Homely home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Home className="h-4 w-4" aria-hidden="true" />
            </span>
            Homely
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            <Link
              href="/ads"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse
            </Link>
            {isLoggedIn ? (
              <Link
                href={`/users/${user.id}/ads`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                My ads
              </Link>
            ) : null}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <Button asChild size="sm">
                <Link href="/adform">
                  <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  List property
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Open user menu"
                  >
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {initials || <UserIcon className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Signed in
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${user.id}`}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${user.id}/ads`}>My ads</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={logoutAction} className="w-full">
                      <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center text-sm"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-display text-xl">Homely</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-1">
              <SheetClose asChild>
                <Link
                  href="/ads"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Browse
                </Link>
              </SheetClose>
              {isLoggedIn ? (
                <>
                  <SheetClose asChild>
                    <Link
                      href={`/users/${user.id}/ads`}
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      My ads
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href={`/users/${user.id}`}
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      Profile
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/adform"
                      className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      List property
                    </Link>
                  </SheetClose>
                  <form action={logoutAction} className="mt-2">
                    <button
                      type="submit"
                      className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="mt-4 rounded-md border border-border px-3 py-2 text-center text-sm font-medium"
                    >
                      Log in
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/signup"
                      className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                    >
                      Sign up
                    </Link>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
