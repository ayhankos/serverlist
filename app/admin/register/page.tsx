"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PiSpinnerBall } from "react-icons/pi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, { message: "İsim 3 karakterden kısa olamaz." }),
  email: z.string().email({ message: "Lütfen geçerli bir mail giriniz." }),
  password: z
    .string()
    .min(6, { message: "Parola 6 karakterden uzun olmalıdır." })
    .regex(
      /^[^\s]{6,26}$/,
      "Parola boşluk içeremez ve 6-26 karakter uzunluğunda olmalıdır."
    ),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function AdminRegister() {
  const [loading, setLoading] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Kayıt başarılı!");

        window.location.href = "/admin/login";
      } else {
        const errorData = await response.json();
        alert(`Kayıt başarısız: ${errorData.message || "Bir hata oluştu."}`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      disabled={loading}
                      {...field}
                      className="w-full bg-gray-700 text-gray-200"
                    />
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
                  <FormLabel className="text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      disabled={loading}
                      {...field}
                      className="w-full bg-gray-700 text-gray-200"
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
                  <FormLabel className="text-gray-200">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      disabled={loading}
                      {...field}
                      className="w-full bg-gray-700 text-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              className="w-full bg-gray-300 hover:bg-gray-400 text-black"
              type="submit"
            >
              {loading ? (
                <PiSpinnerBall className="w-6 h-6 animate-spin" />
              ) : (
                "Kayıt Ol"
              )}
            </Button>
          </form>
        </Form>
        <div className="relative flex justify-center text-xs uppercase mt-4">
          <span className="bg-gray-700 px-2 text-gray-400 py-2 rounded-full">
            Or
          </span>
        </div>
        <div className="mt-4 flex justify-center text-sm">
          <Link href="/admin/login">
            <Button className="bg-gray-600 hover:bg-gray-700">Giriş Yap</Button>
          </Link>
        </div>
        <div className="mt-4 flex justify-center text-sm">
          <Link href="/">
            <Button className="bg-gray-600 hover:bg-gray-700">Ana Sayfa</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
