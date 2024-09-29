import { Metadata } from "next";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStreamers } from "@/utils/streamers/get";
import { FaTwitch, FaYoutube, FaDiscord } from "react-icons/fa";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Streamers Dashboard",
  description: "Dashboard showcasing popular streamers.",
};

export default async function StreamersPage() {
  const streamers = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/adminStreamers`
  );

  return (
    <div className="hidden md:block container ">
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
              Yayıncılarımız
            </h2>
            <p className="text-sm text-muted-foreground text-gray-800">
              Top picks for you. Updated daily.
            </p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {Array.isArray(streamers) &&
            streamers.map((streamer) => (
              <Card key={streamer.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-2">
                    <Image
                      src={streamer.image}
                      alt={streamer.name}
                      layout="fill"
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-semibold text-center mb-2">
                    {streamer.name}
                  </h3>
                  <div className="flex justify-center space-x-2">
                    {streamer.ytLink && (
                      <Link
                        href={streamer.ytLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="bg-white hover:bg-zinc-200"
                          variant="outline"
                        >
                          <FaYoutube
                            className="h-8 w-8"
                            style={{ color: "#FF0000" }}
                          />
                        </Button>
                      </Link>
                    )}
                    {streamer.dcLink && (
                      <Link
                        href={streamer.dcLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="bg-white hover:bg-zinc-200"
                          variant="outline"
                        >
                          <FaDiscord
                            className="h-8 w-8"
                            style={{ color: "#7289DA" }}
                          />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
