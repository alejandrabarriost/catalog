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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReservationSchema } from "@/backend/models/reservation";
import { useEffect, useRef } from "react";
import { DatePickerWithRange } from "./DatePicker";
import { DateRange } from "react-day-picker";

const formSchema = ReservationSchema;

export function ReservationForm({
  className,
  productId,
}: {
  className?: string;
  productId?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: productId,
    },
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/reservation", {
      method: "POST",
      body: JSON.stringify(values),
    });
  }

  const handleDateChange = (date: DateRange) => {
    // create an array of dates between start and end date
    const dates = [];
    const startDate = new Date(date.from!);
    const endDate = new Date(date.to!);
    while (startDate <= endDate) {
      dates.push(new Date(startDate).toISOString());
      startDate.setDate(startDate.getDate() + 1);
    }

    form.setValue("dates", dates);
  };

  useEffect(() => {
    if (buttonRef.current && productId) {
      buttonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      buttonRef.current.focus();
    }
  }, [productId]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight">
          Create A New Reservation
        </CardTitle>
        <CardDescription>Reserve Your Product Now</CardDescription>
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
                    <Input placeholder="Reservation For..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="customer@mail.com..."
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dates"
              render={() => (
                <FormItem>
                  <FormLabel>Dates</FormLabel>
                  <FormControl>
                    <DatePickerWithRange onChange={handleDateChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="f3776e48-d7b8-4bb7-b9ed-ae5943360f66"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button ref={buttonRef} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
