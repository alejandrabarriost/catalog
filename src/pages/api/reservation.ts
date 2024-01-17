import { createReservation } from "@/backend/services/createReservation";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await createReservation(JSON.parse(req.body));

    return res.status(201).json(response);
  }
}
