import { z } from "zod";
import { Reservation, ReservationSchema } from "../models/reservation";
import { supabase } from "../supabase";

export const createReservation = async (
  reservation: z.infer<typeof ReservationSchema>
) => {
  const newReservation = new Reservation(reservation);

  const { data, error } = await supabase
    .from("reservations")
    .insert(newReservation.values)
    .returns();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};
