"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Streamer } from "@prisma/client";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StreamerTable() {
  const [selectedStreamer, setSelectedStreamer] = useState<Streamer | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    error: fetchError,
    isValidating,
  } = useSWR("/api/adminStreamers", fetcher);

  const handleDeleteClick = (streamer: Streamer) => {
    setSelectedStreamer(streamer);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStreamer) {
      const streamerId = selectedStreamer.id;
      try {
        console.log("Deleting streamer ID:", streamerId);

        const res = await fetch("/api/streamerSil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ streamerId: streamerId }),
        });

        if (res.ok) {
          mutate("/api/adminStreamers");
          setIsDeleteDialogOpen(false);
        } else {
          throw new Error("Failed to delete streamer");
        }
      } catch (error) {
        console.error("Error deleting streamer:", error);
        setError(
          "Yayıncı silinirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      }
    }
  };

  if (isValidating) {
    return <div>Yükleniyor...</div>;
  }

  if (fetchError) {
    return <div className="text-red-500">{fetchError.message}</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="hidden md:block">
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
              Yayıncılar
            </h2>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {data?.map(
            (streamer: {
              id: string;
              name: string;
              image: string;
              description: string;
              createdAt: Date;
              updatedAt: Date;
              dcLink: string;
              ytLink: string;
              vip: string;
            }) => (
              <Card key={streamer.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={streamer.image}
                        alt={streamer.name}
                        layout="fill"
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-center text-black">
                    {streamer.name}
                  </h3>
                  <Button
                    variant="destructive"
                    className="mt-2 w-full"
                    onClick={() => handleDeleteClick(streamer)}
                  >
                    Sil
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yayıncıyı Sil</DialogTitle>
            <DialogDescription>
              Bu yayıncıyı silmek istediğinizden emin misiniz? Bu işlem geri
              alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              İptal
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
