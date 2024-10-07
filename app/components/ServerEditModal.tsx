"use client";

import { useState } from "react";
import { Server } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiSpinnerBall } from "react-icons/pi";

interface ServerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  server: Server;
}

export const ServerEditModal: React.FC<ServerEditModalProps> = ({
  isOpen,
  onClose,
  server,
}) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(server.image);
  const [imagePath, setImagePath] = useState(server.image);

  const form = useForm({
    defaultValues: {
      name: server.name,
      image: server.image,
      description: server.description,
      detaylar: server.detaylar,
      launchDate: new Date(server.launchDate).toISOString().split("T")[0],
      vip: server.vip,
      serverType: server.serverType,
      Rank: server.Rank,
      dcLink: server.dcLink,
      webLink: server.webLink,
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
        setImagePreview(server.image);
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

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/serverEdit/${server.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          image: imagePath,
        }),
      });

      if (response.ok) {
        mutate("/api/adminServers");
        onClose();
      }
    } catch (error) {
      console.error("Error updating server:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sunucu Düzenle</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sunucu Adı</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
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
                    <FormLabel>Sunucu Resmi</FormLabel>
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
                          <p>Resim yüklemek için tıklayın veya sürükleyin</p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={loading} rows={3} />
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
                    <FormLabel>Detaylar</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={loading} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="launchDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açılış Tarihi</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled={loading} />
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
                    <FormLabel>VIP Durumu</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="VIP tipini seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="serverType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sunucu Tipi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sunucu tipini seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-99">1-99</SelectItem>
                        <SelectItem value="1-105">1-105</SelectItem>
                        <SelectItem value="1-120">1-120</SelectItem>
                        <SelectItem value="55-120">55-120</SelectItem>
                        <SelectItem value="65-250">65-250</SelectItem>
                        <SelectItem value="98-99">98-99</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sıralama</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dcLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord Bağlantısı</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
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
                    <FormLabel>Web Sitesi</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                İptal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <PiSpinnerBall className="animate-spin h-5 w-5" />
                ) : (
                  "Değişiklikleri Kaydet"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
