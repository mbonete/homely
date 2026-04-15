"use client"

import { useMemo, useState } from "react"
import { Home as HomeIcon } from "lucide-react"

import AdsList from "../AdsList/AdsList"
import SideBar from "../SideBar/SideBar"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"

export default function AdsGridClient({ ads, currentUserId, title, description }) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("newest")

  const filteredAds = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = needle
      ? ads.filter((ad) =>
          [ad.title, ad.summary, ad.details]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(needle))
        )
      : [...ads]

    return filtered.sort((a, b) => {
      if (sort === "title") return (a.title || "").localeCompare(b.title || "")
      const aTime = Number(a.createdAt) || 0
      const bTime = Number(b.createdAt) || 0
      return sort === "oldest" ? aTime - bTime : bTime - aTime
    })
  }, [ads, query, sort])

  const total = ads.length
  const filteredCount = filteredAds.length

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title={title}
        description={
          description ||
          `${filteredCount} of ${total} ${total === 1 ? "listing" : "listings"}`
        }
      />

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <SideBar
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          onReset={() => {
            setQuery("")
            setSort("newest")
          }}
        />

        <div className="flex-1">
          {filteredCount === 0 ? (
            <EmptyState
              icon={HomeIcon}
              title={query ? "No results" : "No listings yet"}
              description={
                query
                  ? "Try a different search term or reset the filters."
                  : "Check back soon — new properties arrive daily."
              }
            />
          ) : (
            <AdsList ads={filteredAds} currentUserId={currentUserId} />
          )}
        </div>
      </div>
    </div>
  )
}
