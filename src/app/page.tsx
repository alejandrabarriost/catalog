import { Button } from "@/UI/components/ui/button";
import { supabase } from "@/backend/supabase";
import SearchProducts from "@/components/SearchProducts";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const products = await supabase
    .from("products")
    .select("id, name, price, description, image, category");

  if (products.error) {
    throw products.error;
  }

  return (
    <main className="container mb-10">
      <div
        style={{
          background:
            "url(https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
        className="bg-cover bg-center bg-no-repeat h-[900px] flex flex-col justify-center mt-6"
      >
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl max-w-96 ml-10">
          Tools INC. Rent Tools for your projects at the best price.
        </h1>
        <div className="flex gap-4 ml-10">
          <Link href="/rent">
            <Button className="mt-10">Start Today</Button>
          </Link>
          <Link href="/rent">
            <Button className="mt-10">Get A Quote For Your Project</Button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<></>}>
        <div className="ml-10 mr-10 mt-10">
          <SearchProducts products={products.data} />
        </div>
      </Suspense>
    </main>
  );
}
