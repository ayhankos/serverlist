"use client";

import { useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function UserAuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      const csrfToken = await getCsrfToken();
      console.log("CSRF Token:", csrfToken);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        csrfToken: csrfToken,
      });

      console.log("result", result);

      if (result?.error) {
        console.error(result.error, "Login failed");
        toast({
          title: "Error",
          description: result.error,
        });
      } else {
        router.push("/admin");
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      }
    } catch (error) {
      console.error(error, "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
        <div className="mt-4">
          <Link href="/admin/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </Form>
    </>
  );
}
