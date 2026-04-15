import "server-only"
import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import path from "node:path"
import fs from "node:fs"
import * as schema from "./schema.js"

const DB_PATH = path.join(process.cwd(), "data", "homely.db")

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const globalForDb = globalThis
let sqlite = globalForDb.__homelySqlite
if (!sqlite) {
  sqlite = new Database(DB_PATH)
  sqlite.pragma("foreign_keys = ON")
  globalForDb.__homelySqlite = sqlite
}

export const db = globalForDb.__homelyDb || drizzle(sqlite, { schema })
globalForDb.__homelyDb = db
export { schema }
