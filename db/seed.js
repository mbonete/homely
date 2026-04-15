import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import bcrypt from "bcrypt"
import path from "node:path"
import fs from "node:fs"

import { users, ads, adImages } from "./schema.js"

const DB_PATH = path.join(process.cwd(), "data", "homely.db")
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const sqlite = new Database(DB_PATH)
sqlite.pragma("foreign_keys = ON")
const db = drizzle(sqlite)

async function main() {
  const passwordHash = await bcrypt.hash("password", 10)

  db.delete(adImages).run()
  db.delete(ads).run()
  db.delete(users).run()

  const [demo] = db
    .insert(users)
    .values({
      name: "Demo User",
      email: "demo@homely.test",
      passwordHash,
    })
    .returning()
    .all()

  const sampleAds = [
    {
      title: "Sunny 2-bedroom apartment in the old town",
      summary: "Bright, cozy, walking distance to everything.",
      details:
        "Fully furnished apartment with a south-facing balcony, modern kitchen and a quiet bedroom. Perfect for couples or small families.",
      cover: "/apartment1.jpg",
    },
    {
      title: "Modern loft with skyline views",
      summary: "Industrial chic loft in the creative district.",
      details:
        "Exposed brick, high ceilings, floor-to-ceiling windows. Gym and rooftop terrace in the building.",
      cover: "/apartment2.jpg",
    },
    {
      title: "Charming studio near the park",
      summary: "Quiet studio apartment with great morning light.",
      details:
        "Renovated kitchenette, hardwood floors, newly installed double-glazed windows. Two minutes from the park entrance.",
      cover: "/apartment3.jpg",
    },
    {
      title: "Family home with garden",
      summary: "Three bedrooms, private garden, close to schools.",
      details:
        "Spacious family home with a large fenced garden, garage, and fully equipped kitchen. Excellent public transit links.",
      cover: "/apartment4.jpg",
    },
    {
      title: "Beachfront condo with sea views",
      summary: "Wake up to the sound of the waves every morning.",
      details:
        "One-bedroom condo steps from the beach, private balcony, shared pool and direct beach access.",
      cover: "/apartment5.jpg",
    },
  ]

  for (const [i, ad] of sampleAds.entries()) {
    const [inserted] = db
      .insert(ads)
      .values({
        userId: demo.id,
        title: ad.title,
        summary: ad.summary,
        details: ad.details,
      })
      .returning()
      .all()

    db.insert(adImages)
      .values({
        adId: inserted.id,
        fileId: ad.cover.replace(/^\//, ""),
        position: 0,
      })
      .run()
  }

  console.log(`Seeded ${sampleAds.length} ads for ${demo.email}`)
  sqlite.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
