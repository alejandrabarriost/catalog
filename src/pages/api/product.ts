import { ProductSchema } from "@/backend/models/product";
import { createProduct } from "@/backend/services/createProduct";
import { searchProducts } from "@/backend/services/searchProduct";
import { supabase } from "@/backend/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await createProduct(JSON.parse(req.body));

    return res.status(201).end();
  }

  if (req.method === "GET") {
    if (!req.query.query) {
      const products = await supabase
        .from("products")
        .select("id, name, price, description, image, category");

      if (products.error) {
        return res.status(500);
      }

      return res.status(200).send(products.data);
    }

    const { data, error } = await searchProducts(req.query.query as string);

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    const { data: products } = await supabase
      .from("products")
      .select("id, name, price, description, image, category")
      .in(
        "id",
        data.map(r => r.id)
      );

    return res.json(products);
  }

  return res.status(400).json({
    message: "Not Supported Method",
  });
}
