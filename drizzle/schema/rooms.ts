import { sql } from "drizzle-orm";
import { pgTable, uuid,varchar, timestamp } from "drizzle-orm/pg-core";

export const rooms = pgTable(
    'rooms',
    {
        id: uuid('id')
            .primaryKey()
            .default(sql`gen_random_uuid()`),
        slug: varchar('slug', { length: 255 }).notNull().unique(),
        name: varchar('name', { length: 255 }).notNull(),
        createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
    }
)