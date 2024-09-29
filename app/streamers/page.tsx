import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaDiscord } from "react-icons/fa";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  AwaitedReactNode,
} from "react";
import { UrlObject } from "url";

export const metadata: Metadata = {
  title: "Streamers Dashboard",
  description: "Dashboard showcasing popular streamers.",
};

export default async function StreamersPage() {
  const response = await fetch("/api/adminStreamers");

  if (!response.ok) {
    throw new Error("Failed to fetch streamers");
  }

  const streamers = await response.json();

  return (
    <div className="hidden md:block container">
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
          {streamers?.map(
            (streamer: {
              id: Key | null | undefined;
              image: string | undefined;
              name:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | Promise<AwaitedReactNode>
                | null
                | undefined;
              ytLink: string | UrlObject;
              dcLink: string | UrlObject;
            }) => (
              <Card key={streamer.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-2">
                    <img
                      src={streamer.image}
                      alt={streamer.name?.toString()}
                      className="w-full h-full object-cover rounded-full"
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
            )
          )}
        </div>
      </div>
    </div>
  );
}
