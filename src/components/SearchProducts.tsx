"use client";

import { ProductSchema } from "@/backend/models/product";
import React, { useState } from "react";
import { z } from "zod";
import ProductsCarousel from "./ProductsCarousel";
import { Skeleton } from "@/UI/components/ui/skeleton";
import { Input } from "@/UI/components/ui/input";
import { debounce } from "@/utils";
import { Label } from "@/UI/components/ui/label";

import { Badge } from "@/UI/components/ui/badge";
import { Card, CardContent } from "@/UI/components/ui/card";

interface SearchProductsProps {
  products: Omit<z.infer<typeof ProductSchema>, "embedding">[];
}

const makeQuery = async (query: string) => {
  const request = await fetch(`/api/product?query=${query}`, {
    method: "GET",
  });

  const response = await request.json();

  return response as SearchProductsProps["products"];
};

export default function SearchProducts({ products }: SearchProductsProps) {
  const [resuls, setResults] = useState<SearchProductsProps["products"]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const search = debounce(async function (_val: string) {
    if (!_val || _val.length < 1) return setResults([]);
    setIsLoading(true);
    const results = await makeQuery(_val);
    setResults(results);
    setIsLoading(false);
  }, 1000);

  return (
    <div>
      <Label className="text-lg font-bold" htmlFor="search">
        Search For A Product...
      </Label>
      <Input
        type="text"
        placeholder="Search By Category, Title, Description, etc..."
        id="search"
        className="w-full mt-1"
        onChange={e => {
          const query = e.target.value;

          if (!query || query.length < 1) {
            setResults([]);
            setIsLoading(false);
            return;
          }

          search(query);
        }}
        disabled={isLoading}
      />

      {resuls.length > 0 && !isLoading && (
        <Card className="mt-2 h-[300px] overflow-y-scroll">
          <CardContent>
            <div>
              {resuls.map(product => (
                <div className="p-1" key={product.id}>
                  <Card>
                    <CardContent className="flex items-center justify-center p-2 cursor-pointer">
                      <span className="text-xl font-semibold">
                        {product.name}
                      </span>
                      <Badge variant="default" className="text-[10px]">
                        {product.category}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card className="mt-2 h-[230px]">
          <CardContent>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div className="p-1" key={idx}>
                <Card>
                  <CardContent className="flex items-center justify-center p-2">
                    <SkeletonDemo />
                  </CardContent>
                </Card>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {products.length > 0 && (
        <div className="mt-6">
          <div>
            <Label className="text-lg font-bold">Hot Products Today!</Label>
            <div className="ml-10 mr-10">
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px] bg-gray-300" />
        <Skeleton className="h-4 w-[500px] bg-gray-300" />
      </div>
    </div>
  );
}
