import { cn } from "@/lib/utils"

export function Logo({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Homely"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      <rect width="32" height="32" rx="7" fill="hsl(173 58% 39%)" />
      <path
        d="M7 26 V15 A9 9 0 0 1 25 15 V26"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="7"
        y1="26"
        x2="25"
        y2="26"
        stroke="#ffffff"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  )
}
