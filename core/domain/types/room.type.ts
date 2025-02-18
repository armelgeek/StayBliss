import { z } from "zod";
import { RoomFormSchema } from "../schema/room.schema";

export type RoomPayload = z.infer<typeof RoomFormSchema>;

export interface PaginatedRoom {
  data: RoomPayload[];
}