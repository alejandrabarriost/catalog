import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
  id: z.string().optional(),
  embedding: z.array(z.number()),
});

export class Product {
  constructor(public values: z.infer<typeof ProductSchema>) {
    this.values = values;
    this.validate();
  }

  private validate() {
    const result = ProductSchema.safeParse(this.values);
    if (!result.success) {
      throw new Error(result.error.message);
    }
  }
}
