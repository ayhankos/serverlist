"use client";

import { useState } from "react";
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

interface Streamer {
  id: string;
  name: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  dcLink: string;
  ytLink: string;
  vip: string;
}

interface StreamerDeleteClientProps {
  initialStreamers: Streamer[];
}

export default function StreamerDeleteClient({
  initialStreamers,
}: StreamerDeleteClientProps) {
  const [streamers, setStreamers] = useState<Streamer[]>(initialStreamers);
  const [selectedStreamer, setSelectedStreamer] = useState<Streamer | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (streamer: Streamer) => {
    setSelectedStreamer(streamer);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStreamer) {
      const streamerId = selectedStreamer.id;
      try {
        console.log("Deleting streamer ID:", selectedStreamer.id);

        const res = await fetch("/api/streamerSil", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ streamerId: streamerId }),
        });

        if (res.ok) {
          setStreamers(streamers.filter((s) => s.id !== selectedStreamer.id));
          setIsDeleteDialogOpen(false);
        } else {
          console.error("Failed to delete streamer");
        }
      } catch (error) {
        console.error("Error deleting streamer:", error);
      }
    }
  };

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
          {streamers.map((streamer) => (
            <Card key={streamer.id} className="bg-white">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-2">
                  <img
                    src={streamer.image}
                    alt={streamer.name}
                    className="w-full h-full object-cover rounded-full"
                  />
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
          ))}
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
