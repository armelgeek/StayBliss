import { RoomPayload } from '@/core/domain/types/room.type';
import { db } from '@/drizzle/db';
import { rooms } from '@/drizzle/schema/rooms';
import { eq } from 'drizzle-orm';

export async function getRoomById(id: string): Promise<RoomPayload> {
  
  const room = await db
  .select()
	.from(rooms)
  .where(eq(rooms.id, id))
  .then((res) => res[0]);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
}