import { db } from '@/drizzle/db';
import { rooms } from '@/drizzle/schema/rooms';
import { eq } from 'drizzle-orm';

export async function getRoomById(id: string) {
  
  const room = await db
  .select()
	.from(rooms)
  .where(eq(rooms.id, id))

  return room;
}