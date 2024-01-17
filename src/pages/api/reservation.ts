import { createReservation } from "@/backend/services/createReservation";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const response = await createReservation(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Tools, INC. <onboarding@resend.dev>",
      to: [body.email],
      subject: "Rent Order Confirmed",
      html: "<strong>Your reserve has been successfully confirmed. thanks for using our service. --- Tools, INC.</strong>",
    });

    return res.status(201).json(response);
  }
}
