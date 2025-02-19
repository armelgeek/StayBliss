import { db } from "@/drizzle/db";
import { reservations } from "@/drizzle/schema/reservations";
import { rooms } from "@/drizzle/schema/rooms";
import { sql } from "drizzle-orm";
import { and, not, or } from "drizzle-orm";

export async function filterRoomsByDate(
  start: string = "2024-09-21",
  end: string = "2024-09-27"
) {
  if (!start || !end) {
    throw new Error("Start and end dates are required");
  }

  if (start >= end) {
    throw new Error("Start date must be before end date");
  }
  const availableRooms = await db
    .select()
    .from(rooms)
    .where(
      not(
        sql`EXISTS (
          SELECT 1 FROM ${reservations}
          WHERE ${reservations.room_id} = ${rooms.id}
          AND ${reservations.status} = 'confirmed'
          AND (
            (${reservations.start_date} >= ${start} AND ${reservations.start_date} < ${end})
            OR (${reservations.end_date} > ${start} AND ${reservations.end_date} <= ${end})
            OR (${reservations.start_date} <= ${start} AND ${reservations.end_date} >= ${end})
          )
        )`
      )
    );

  return availableRooms;
}

// Additional utility function to check if a specific room is available
export async function isRoomAvailable(
  roomId: number,
  start: string,
  end: string
): Promise<boolean> {
  if (!roomId || !start || !end) {
    throw new Error("Room ID, start date, and end date are required");
  }

  if (start >= end) {
    throw new Error("Start date must be before end date");
  }

  const conflictingReservations = await db
    .select()
    .from(reservations)
    .where(
      and(
        sql`${reservations.room_id} = ${roomId}`,
        sql`${reservations.status} = 'confirmed'`,
        or(
          sql`${reservations.start_date} >= ${start} AND ${reservations.start_date} < ${end}`,
          sql`${reservations.end_date} > ${start} AND ${reservations.end_date} <= ${end}`,
          sql`${reservations.start_date} <= ${start} AND ${reservations.end_date} >= ${end}`
        )
      )
    );

  return conflictingReservations.length === 0;
}