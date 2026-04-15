import { AlertCircle } from "lucide-react"

export default function ErrorMessage({ children }) {
  if (!children) return null
  const text =
    typeof children === "string"
      ? children.charAt(0).toUpperCase() + children.slice(1)
      : children
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}
