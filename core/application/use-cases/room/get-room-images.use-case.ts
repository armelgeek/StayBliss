import { db } from "@/drizzle/db";
import { room_images } from "@/drizzle/schema/room_images";
import { eq } from "drizzle-orm";
export async function getRoomImages(id: string) {
  const room_img = await db.select().from(room_images).where(eq(room_images.room_id, id));
  return room_img;
}