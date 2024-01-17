import { supabase } from "@/backend/supabase";
import { ReservationForm } from "@/components/CreateReservationForm";
import { ProductForm } from "@/components/Form";
import SearchProducts from "@/components/SearchProducts";
import { Separator } from "@/UI/components/ui/separator";
import { Suspense } from "react";

export default async function Rent({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const products = await supabase
    .from("products")
    .select("id, name, price, description, image, category");

  if (products.error) {
    throw products.error;
  }

  return (
    <main className="container mt-2 mb-10">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mb-2">
        Rent
      </h1>
      <Separator className="mb-10" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mb-10">
          <SearchProducts products={products.data} />
        </div>
      </Suspense>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mb-2">
        Create a New Reservation
      </h1>
      <Separator className="mb-10" />
      <div className="flex justify-center">
        <ReservationForm
          className="max-w-lg"
          productId={searchParams.product}
        />
      </div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mb-2 mt-10">
        Create a New Product
      </h1>
      <Separator className="mb-10" />
      <div className="flex justify-center">
        <ProductForm className="max-w-lg" />
      </div>
    </main>
  );
}
