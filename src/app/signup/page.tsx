"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", data);

      console.log("Sign_up successful", response.data);

      toast({
        title: "Success",
        description: "Sign_up successful",
      });

      router.push("/login");
    } catch (error: any) {
      console.log("Sign_up failed ", error.message);

      toast({
        title: "Error",
        description: "username or email already exists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {loading ? (
              <div className="space-x-2">
                Loading
                <span className="loading loading-dots loading-xs" />
              </div>
            ) : (
              "Sign Up"
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full space-y-5"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="devct" {...field} />
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
                      <Input placeholder="Email" type="email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
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
                    <FormLabel>ConfrimPassword</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ConfrimPassword"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">SignUP</Button>
            </form>
          </Form>
          <div className="space-y-3">
            <div className="flex justify-center gap-x-0.5 items-center">
              <span className="w-5 h-1 dark:bg-gray-400" />
              <span className="uppercase">or</span>
              <span className="w-5 h-1 dark:bg-gray-400" />
            </div>
            <p className="text-center text-blue-500 capitalize hover:underline">
              <Link href="/login">already have an account ?</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
