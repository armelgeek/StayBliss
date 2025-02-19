import { db } from "@/drizzle/db";
import { reservations } from "@/drizzle/schema/reservations";
import { rooms } from "@/drizzle/schema/rooms";
import { sql } from "drizzle-orm";

export async function filterRoomsByDate(start = "2024-09-21", end = "2024-09-27") {
  const reserv = await db
    .select()
    .from(reservations)
    .where(
      sql`
        status = 'confirmed'
        AND (
          start_date >= ${start} AND start_date <= ${end}
          OR end_date >= ${start} AND end_date <= ${end}
          OR start_date <= ${start} AND end_date >= ${end}
        )
      `
    );

  const reservations_ids = reserv.map((item) => item.room_id);

  const room = await db
    .select()
    .from(rooms)
    .where(sql`id NOT IN (${reservations_ids.map((id) => `'${id}'`)})`);

  return room;
}
