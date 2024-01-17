import { Card, CardContent } from "@/UI/components/ui/card";
import React, { useState } from "react";
import { CarouselItem } from "@/UI/components/ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/UI/components/ui/popover";
import { Button } from "@/UI/components/ui/button";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ProductSchema } from "@/backend/models/product";

const supabaseBucketUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_BUCKET;

export default function CarouselItemComp({
  product,
}: {
  product: Omit<z.infer<typeof ProductSchema>, "embedding">;
}) {
  const [open, setOpen] = useState(false);

  async function copyIdToClipboard(id: string) {
    await navigator.clipboard.writeText(id);
    toast.success("ID Copied to clipboard!");
  }

  const router = useRouter();

  return (
    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
      <div className="p-1">
        <Card className="min-h-[250px]">
          <CardContent className="flex items-center justify-center p-6 min-h-[250px]">
            <img
              src={`${supabaseBucketUrl}/${product.image}`}
              alt={product.name}
              className="w-16 h-16 object-cover border-r-2 border-gray-200 mr-4"
              fetchPriority="low"
            />

            <div>
              <span className="text-xs font-semibold">Name: </span>
              <span className="text-xs font-light">{product.name}</span>
              <br />
              <span className="text-xs font-semibold">Category: </span>
              <span className="text-xs font-light">{product.category}</span>
              <br />
              <span className="text-xs font-semibold">Description: </span>
              <span className="text-xs font-light">{product.description}</span>
              <br />
              <span className="text-xs font-semibold">Price: </span>
              <span className="text-xs font-extrabold">
                {product.price} <strong className="font-extrabold">USD</strong>
              </span>
              <br />
              <div className="mt-2 flex gap-2">
                <Button
                  onClick={() => router.push(`/rent?product=${product.id}`)}
                  className="w-full"
                >
                  Rent
                </Button>
                <Popover open={open}>
                  <PopoverTrigger
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    onClick={() => copyIdToClipboard(product.id!)}
                  >
                    <Clipboard />
                  </PopoverTrigger>
                  <PopoverContent className="flex text-center w-26 font-bold text-sm">
                    Copy ID To Clipboard
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
