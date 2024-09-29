"use client";

import { useEffect, useState } from "react";
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

export default function StreamerTable() {
  const [selectedStreamer, setSelectedStreamer] = useState<Streamer | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Streamer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/adminStreamers");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const streamers = await response.json();
        setData(streamers);
      } catch (e) {
        console.error("Fetching streamers failed:", e);
        setError(
          "Yayıncılar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
          setData((prevData) => prevData.filter((s) => s.id !== streamerId));
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

  if (isLoading) {
    return <div>Yükleniyor...</div>;
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
          {data.map((streamer) => (
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
