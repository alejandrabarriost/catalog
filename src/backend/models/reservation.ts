import { z } from "zod";

export const ReservationSchema = z.object({
  name: z.string(),
  email: z.string(),
  dates: z.array(z.string()),
  id: z.string().optional(),
  product: z.string(),
});

export class Reservation {
  constructor(public values: z.infer<typeof ReservationSchema>) {
    this.values = values;
    this.validate();
  }
  validate() {
    const result = ReservationSchema.safeParse(this.values);
    if (!result.success) {
      throw new Error(result.error.message);
    }
  }
}
