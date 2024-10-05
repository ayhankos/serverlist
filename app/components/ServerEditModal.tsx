"use client";

import { useState } from "react";
import { Server } from "@prisma/client";
import { Button } from "@/components/ui/button";
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

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/serverEdit/${server.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
                    <FormLabel>Resim URL</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                name="serverType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sunucu Tipi</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
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
                Değişiklikleri Kaydet
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
