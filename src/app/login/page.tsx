"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be 6 characters." }),
});

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", data);

      console.log("Sign_up successful", response.data);

      toast({
        title: "Success",
        description: "Sign_up successful",
      });

      router.push("/profile");
    } catch (error: any) {
      console.log("Sign_up failed ", error.message);

      toast({
        title: "Error",
        description: "email or password incorrect",
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
              <div className="flex gap-x-2 items-center">
                <span className="block">Loading</span>
                <span className="loading loading-dots loading-xs block" />
              </div>
            ) : (
              "Login"
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

              <Button type="submit" className="uppercase">
                login
              </Button>
            </form>
          </Form>
          <div className="space-y-3">
            <div className="flex justify-center gap-x-0.5 items-center">
              <span className="w-5 h-1 dark:bg-gray-400" />
              <span className="uppercase">or</span>
              <span className="w-5 h-1 dark:bg-gray-400" />
            </div>
            <p className=" text-blue-500 capitalize hover:underline text-center">
              <Link href="/signup">{`don't have an account ?`}</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
