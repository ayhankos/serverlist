import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaDiscord } from "react-icons/fa";

interface Streamer {
  id: string;
  name: string;
  image: string;
  ytLink?: string;
  dcLink?: string;
}

interface StreamersListProps {
  streamers: Streamer[];
}

const StreamersList: React.FC<StreamersListProps> = ({ streamers }) => {
  return (
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
            <h3 className="font-semibold text-center mb-2">{streamer.name}</h3>
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
  );
};

export default StreamersList;
