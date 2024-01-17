"use client";

import { Button } from "@/UI/components/ui/button";
import { Card, CardContent } from "@/UI/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/UI/components/ui/carousel";
import { ProductSchema } from "@/backend/models/product";
import Autoplay from "embla-carousel-autoplay";
import { Clipboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/UI/components/ui/popover";
import { useState } from "react";
import CarouselItemComp from "./CarouselItem";

interface ProductsCarouselProps {
  products: Omit<z.infer<typeof ProductSchema>, "embedding">[];
}

const supabaseBucketUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_BUCKET;

export default function ProductsCarousel({
  products = [],
}: ProductsCarouselProps) {
  const router = useRouter();

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000 })]}
      className="w-full"
    >
      <CarouselContent>
        {products.map(product => {
          return <CarouselItemComp product={product} key={product.id} />;
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
