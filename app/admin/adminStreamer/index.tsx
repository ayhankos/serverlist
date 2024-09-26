"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PiSpinnerBall } from "react-icons/pi";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  image: z.string(),
  dcLink: z.string(),
  ytLink: z.string(),
  vip: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export const StreamerForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      dcLink: "",
      ytLink: "",
      vip: "",
    },
  });

  const uploadImageToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const result = await response.json();
    return result.imagePath;
  };

  const handleImageDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        const uploadedImagePath = await uploadImageToServer(file);
        setImagePath(uploadedImagePath);
        form.setValue("image", uploadedImagePath);
      } catch (error) {
        console.error("File upload failed", error);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleFormSubmit = async (data: FormValues) => {
    console.log(data);
    setLoading(true);

    try {
      const response = await fetch("/api/VipStreamer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error("Server creation failed");
      }

      const result = await response.json();
      console.log(result);
      form.reset();
      setImagePath("");
    } catch (error) {
      console.error("Server creation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6 p-10 pb-16 block"
      >
        <div className="md:grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Name"
                    className="bg-zinc-100"
                  />
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
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={loading}
                    placeholder="Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dcLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="dcLink">Discord Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Discord Link"
                    className="bg-zinc-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vip"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="vip">VIP</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select VIP type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-100 text-black">
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ytLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="ytLink">Youtube Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Youtube Link"
                    className="bg-zinc-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="image">Image</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    {imagePath ? (
                      <img
                        src={imagePath}
                        alt="Selected Image"
                        className="max-w-full h-auto"
                      />
                    ) : (
                      <p>Drag and drop an image here, or click to select one</p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? (
            <PiSpinnerBall className="animate-spin h-5 w-5" />
          ) : (
            "Create Server"
          )}
        </Button>
      </form>
    </Form>
  );
};
