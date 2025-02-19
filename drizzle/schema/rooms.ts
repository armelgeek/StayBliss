import { sql } from "drizzle-orm";
import {  } from "drizzle-orm/mysql-core";
import { pgTable, decimal, uuid, varchar, timestamp, text, integer } from "drizzle-orm/pg-core";

export const rooms = pgTable(
    'rooms',
    {
        id: uuid('id')
            .primaryKey()
            .default(sql`gen_random_uuid()`),
        slug: varchar('slug', { length: 255 }).notNull().unique(),
        price: decimal('price', { precision: 10, scale: 2 }).notNull(),
        name: varchar('name', { length: 255 }).notNull(),
        sleeps: integer('sleeps').notNull(),
        thumbnail: text('thumbnail'),
        capacity: integer('capacity').notNull(),
        createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
    }
)