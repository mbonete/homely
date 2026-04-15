import { Logo } from "@/components/ui/logo"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold">Homely</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Maria Bonete. Crafted with care.
        </p>
      </div>
    </footer>
  )
}
