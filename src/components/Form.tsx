"use client";

import { Button } from "@/UI/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/UI/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UI/components/ui/card";
import { Input } from "@/UI/components/ui/input";
import { ProductSchema } from "@/backend/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { supabase } from "@/backend/supabase";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

const formSchema = ProductSchema.omit({
  embedding: true,
  _id: true,
  image: true,
}).extend({
  price: z.string().transform(val => Number(val)),
});

export function ProductForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (imageFile instanceof File) {
      const { data, error } = await supabase.storage
        .from("catalog_images")
        .upload(nanoid(), imageFile, {
          contentType: imageFile.type,
        });

      if (error) throw error;

      await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify({ ...values, image: data.path }),
      });

      window.dispatchEvent(new Event("refetch-search-products"));
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight">
          Create A New Product
        </CardTitle>
        <CardDescription>
          Enter the data to create a new product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Work Stair..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stair 30 x 40, Solid Metal..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Garden Tools" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="50.0 USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Image File"
                      type="file"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                        }
                      }}
                      required
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
