"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

async function getVipStreamerData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/vipStreamers`
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.error("API Error:", res.status);
    return null;
  }

  return res.json();
}

interface StreamerData {
  map(arg0: (item: any) => React.JSX.Element): React.ReactNode;
  id: number;
  name: string;
  image: string;
  ytLink: string;
  dcLink: string;
}

export default function Streamers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [streamer, setStreamer] = useState<StreamerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVipStreamerData();
      if (!data) {
        return;
      } else {
        setStreamer(data);
      }
    };

    fetchData();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [emblaApi, onSelect]);

  if (!streamer) {
    return <p className="text-black">No streamers to display</p>;
  }

  return (
    <Card className="w-full h-full border-none bg-white">
      <CardContent>
        <div
          className="relative w-full max-w-full overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex">
            {streamer?.map((item: any) => (
              <div
                key={item.id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
              >
                <Card className="transition-all duration-300 bg-white border-none">
                  <CardContent className="flex h-1/2 items-center justify-center p-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
