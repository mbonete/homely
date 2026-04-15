"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { eq, and } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import path from "node:path"
import fs from "node:fs/promises"
import { z } from "zod"

import { db } from "@/db"
import { ads, adImages } from "@/db/schema"
import { requireUser } from "@/lib/auth"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")

const adSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  details: z.string().min(10, "Details must be at least 10 characters"),
})

async function saveImages(files) {
  await fs.mkdir(UPLOADS_DIR, { recursive: true })
  const saved = []
  for (const file of files) {
    if (!file || typeof file === "string") continue
    if (file.size === 0) continue
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase()
    const fileId = `${randomUUID()}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(path.join(UPLOADS_DIR, fileId), buffer)
    saved.push(fileId)
  }
  return saved
}

export async function createAdAction(_prevState, formData) {
  const user = await requireUser()

  const parsed = adSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    details: formData.get("details"),
  })
  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors
    return { ok: false, fieldErrors: fields }
  }

  const files = formData.getAll("images")
  const fileIds = await saveImages(files)

  const [inserted] = db
    .insert(ads)
    .values({
      userId: Number(user.id),
      title: parsed.data.title,
      summary: parsed.data.summary,
      details: parsed.data.details,
    })
    .returning()
    .all()

  fileIds.forEach((fileId, idx) => {
    db.insert(adImages)
      .values({ adId: inserted.id, fileId, position: idx })
      .run()
  })

  revalidatePath("/ads")
  revalidatePath(`/users/${user.id}/ads`)
  redirect(`/ads/${inserted.id}`)
}

export async function updateAdAction(adId, _prevState, formData) {
  const user = await requireUser()
  const id = Number(adId)

  const [existing] = db.select().from(ads).where(eq(ads.id, id)).all()
  if (!existing) return { ok: false, error: "Listing not found" }
  if (existing.userId !== Number(user.id)) {
    return { ok: false, error: "Not authorized" }
  }

  const parsed = adSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    details: formData.get("details"),
  })
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors }
  }

  db.update(ads).set(parsed.data).where(eq(ads.id, id)).run()

  revalidatePath("/ads")
  revalidatePath(`/ads/${id}`)
  revalidatePath(`/users/${user.id}/ads`)
  redirect(`/ads/${id}`)
}

export async function deleteAdAction(adId) {
  const user = await requireUser()
  const id = Number(adId)

  const [existing] = db.select().from(ads).where(eq(ads.id, id)).all()
  if (!existing) return { ok: false, error: "Listing not found" }
  if (existing.userId !== Number(user.id)) {
    return { ok: false, error: "Not authorized" }
  }

  const images = db.select().from(adImages).where(eq(adImages.adId, id)).all()
  for (const img of images) {
    if (img.fileId.startsWith("apartment")) continue
    try {
      await fs.unlink(path.join(UPLOADS_DIR, img.fileId))
    } catch {}
  }

  db.delete(ads).where(and(eq(ads.id, id), eq(ads.userId, Number(user.id)))).run()

  revalidatePath("/ads")
  revalidatePath(`/users/${user.id}/ads`)
  redirect("/ads")
}
