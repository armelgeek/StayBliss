import { z } from "zod";

export const bookingSchema = z.object({
  guests_count: z.number().gt(0).or(z.literal(0)).refine((val) => val > 0, {
    message: "guests number is invalid",
  }),
  start_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "date is invalid",
  }),
  end_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "date is invalid",
  }),
});
