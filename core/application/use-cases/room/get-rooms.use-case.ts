import { db } from '@/drizzle/db';
import { rooms } from '@/drizzle/schema/rooms';

export async function getAllRooms() {
  const room = await db
  .select()
	.from(rooms)
  
  return room;
}