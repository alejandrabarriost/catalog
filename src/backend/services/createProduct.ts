import { Product, ProductSchema } from "@/backend/models/product";
import { OpenAI } from "../openAI";
import { z } from "zod";
import { supabase } from "@/backend/supabase";

export const createProduct = async (
  product: Omit<z.infer<typeof ProductSchema>, "embedding" | "_id">
) => {
  const newProduct = new Product({
    ...product,
    embedding: [],
  });

  const embedding = await OpenAI.embeddings.create({
    input: `${product.name}, ${product.description}, ${product.category}`,
    model: "text-embedding-ada-002",
  });

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...newProduct.values,
      embedding: embedding.data[0].embedding as any,
    })
    .returns();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
};
