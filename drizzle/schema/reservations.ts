import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { rooms } from "./rooms";

export const reservations = pgTable(
    'reservations',
    {
        id: uuid('id')
            .primaryKey()
            .default(sql`gen_random_uuid()`),
        room_id: uuid('room_id')
            .notNull()
            .references(() => rooms.id),
        guest_id: uuid('guest_id').notNull(),
        start_date: timestamp('start_date', { mode: 'string' }).notNull(),
        end_date: timestamp('end_date', { mode: 'string' }).notNull(),
        stripe_session_id: varchar('stripe_session_id', { length: 255 }),
        status: varchar('status', { length: 50 }).notNull(),
        reserved_price: decimal('reserved_price', { precision: 10, scale: 2 }).notNull(),
        guests_count: integer('guests_count').notNull(),
        deleted_at: timestamp('deleted_at', { mode: 'string' })
    }
)