import { rooms } from '@/drizzle/schema/rooms';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const RoomSelectSchema = createSelectSchema(rooms);

export const RoomFormSchema = createInsertSchema(rooms, {
  name: (s) => s.min(1, 'Name is required.').max(255, 'Name must be at most 255 characters.'),
  slug: (s) => s.min(1, 'Slug is required.').max(255, 'Slug must be at most 255 characters.'),
  createdAt: (s) => s.optional(),
  updatedAt: (s) => s.optional(),
});
