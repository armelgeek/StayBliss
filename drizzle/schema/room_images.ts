import { sql } from "drizzle-orm";
import { pgTable,text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms";
export const room_images = pgTable(
  'room_images',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    room_id: uuid('room_id')
      .notNull()
      .references(() => rooms.id),
    image: text('image'),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  })