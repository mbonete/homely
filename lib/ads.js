import "server-only"
import { eq, desc } from "drizzle-orm"
import { db } from "@/db"
import { ads, adImages, users } from "@/db/schema"

function imageSrc(fileId) {
  if (!fileId) return "/apartment1.jpg"
  if (fileId.startsWith("apartment")) return `/${fileId}`
  return `/uploads/${fileId}`
}

function groupImages(rows) {
  const map = new Map()
  for (const row of rows) {
    if (!row.ad) continue
    const current = map.get(row.ad.id) || {
      ...row.ad,
      owner: row.owner,
      images: [],
    }
    if (row.image) {
      current.images.push({
        id: row.image.id,
        fileId: row.image.fileId,
        src: imageSrc(row.image.fileId),
        position: row.image.position,
      })
    }
    map.set(row.ad.id, current)
  }
  return Array.from(map.values()).map((ad) => ({
    ...ad,
    images: ad.images.sort((a, b) => a.position - b.position),
  }))
}

export async function listAds() {
  const rows = db
    .select({
      ad: ads,
      image: adImages,
      owner: { id: users.id, name: users.name, email: users.email },
    })
    .from(ads)
    .leftJoin(adImages, eq(adImages.adId, ads.id))
    .leftJoin(users, eq(users.id, ads.userId))
    .orderBy(desc(ads.createdAt))
    .all()
  return groupImages(rows)
}

export async function getAdById(id) {
  const rows = db
    .select({
      ad: ads,
      image: adImages,
      owner: { id: users.id, name: users.name, email: users.email },
    })
    .from(ads)
    .leftJoin(adImages, eq(adImages.adId, ads.id))
    .leftJoin(users, eq(users.id, ads.userId))
    .where(eq(ads.id, Number(id)))
    .all()
  const [ad] = groupImages(rows)
  return ad || null
}

export async function listAdsByUser(userId) {
  const all = await listAds()
  return all.filter((ad) => ad.userId === Number(userId))
}

export async function getUserById(id) {
  const [user] = db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, Number(id)))
    .all()
  return user || null
}
