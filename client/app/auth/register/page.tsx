"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(2, "Email must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", values);
  };

  return (
    <div className="relative h-screen w-full bg-white">
      {/* green dabba */}
      <div className="absolute top-0 left-0 w-full h-1/2">
        <svg viewBox="0 1 20 10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 0 L 24 0 L 24 4 C 18 8 11 4 0 2"
            fill="#b1d6a9"
            stroke="#b1d6a9"
            stroke-width="1"
          />
        </svg>
      </div>

      {/* form */}
      <div className="absolute w-full max-w-lg top-50 left-20 p-6 space-y-8 text-black">
        <h1 className="text-6xl font-bold text-black mb-1.5">SIGN UP</h1>
        <hr className="bg-[#579e86] h-1.5 w-[35%] rounded-2xl" />
        <p className="text-right">
          Already a User?<a className="underline" href="https://www.google.com/">Login</a>
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-[#b1d6a9] text-black placeholder:text-black"
                      placeholder="E-Mail ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-[#b1d6a9] text-black placeholder:text-black"
                      type="password"
                      placeholder="Create a password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-[#b1d6a9] text-black placeholder:text-black"
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-5 bg-[#579e86] text-black"
            >
              CONTINUE
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
