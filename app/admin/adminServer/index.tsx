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
import { mutate } from "swr";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  detaylar: z.string(),
  vip: z.enum(["vip", "normal"]),
  launchDate: z.date(),
  image: z.string(),
  serverType: z.string(),
  rank: z.string(),
  dcLink: z.string(),
  webLink: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export const AdminServerForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      detaylar: "",
      vip: "normal",
      launchDate: new Date(),
      image: "",
      serverType: "1-99",
      rank: "0",
      dcLink: "https://discord.com/invite/pvpserverlar",
      webLink: "https://pvpserverlar.tr/",
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
        setLoading(true);
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);

        const uploadedImagePath = await uploadImageToServer(file);
        setImagePath(uploadedImagePath);
        form.setValue("image", uploadedImagePath);
      } catch (error) {
        console.error("File upload failed", error);
        setImagePreview(null);
      } finally {
        setLoading(false);
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
      const response = await fetch("/api/serverEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          detaylar: data.detaylar,
          Rank: data.rank,
          image: imagePath,
        }),
      });

      if (!response.ok) {
        throw new Error("Server creation failed");
      }

      if (response.ok) {
        mutate("/api/adminServers");
        mutate("/api/VipServers");
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
            name="detaylar"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="detaylar">Detaylar</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={loading}
                    placeholder="Detaylar"
                    className="bg-zinc-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rank"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="rank">Rank</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Rank"
                    className="bg-zinc-100"
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
            name="webLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="webLink">Web Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Website Link"
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
            name="serverType"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="serverType">Server Tipi</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select server type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-100 text-black">
                    <SelectItem
                      value="1-99"
                      className="bg-zinc-100 cursor-pointer hover:bg-hero-pattern"
                    >
                      1-99
                    </SelectItem>
                    <SelectItem
                      value="1-105"
                      className="bg-zinc-100 cursor-pointer hover:bg-hero-pattern"
                    >
                      1-105
                    </SelectItem>
                    <SelectItem
                      value="1-120"
                      className="bg-zinc-100 cursor-pointer hover:bg-hero-pattern"
                    >
                      1-120
                    </SelectItem>
                    <SelectItem
                      value="55-120"
                      className="bg-zinc-100 cursor-pointer hover:bg-hero-pattern"
                    >
                      55-120
                    </SelectItem>
                    <SelectItem
                      value="65-250"
                      className="bg-zinc-100 cursor-pointer hover:bg-hero-pattern"
                    >
                      65-250
                    </SelectItem>
                    <SelectItem
                      value="98-99"
                      className="bg-zinc-100 cursor-pointer hover:bg-hero-pattern"
                    >
                      98-99
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="launchDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="launchDate">Launch Date</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="bg-zinc-700 appearance-none pl-10 text-white"
                      {...field}
                      type="date"
                      disabled={loading}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : field.value
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    📅
                  </span>
                </div>
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
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected Image"
                        className="max-w-full h-auto mx-auto"
                        style={{ maxHeight: "200px" }}
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
