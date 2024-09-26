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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 768px)": { slidesToScroll: 3 },
      "(min-width: 1024px)": { slidesToScroll: 4 },
      "(min-width: 1280px)": { slidesToScroll: 5 },
    },
  });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [streamer, setStreamer] = useState<StreamerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVipStreamerData();
      if (data) {
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

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoScroll);
    };
  }, [emblaApi, onSelect]);

  if (!streamer) {
    return <p className="text-black">No streamers to display</p>;
  }

  return (
    <Card className="w-full border-none bg-zinc-100 shadow-none">
      <CardContent className="p-2 sm:p-4 border-none shadow-none">
        <div className="relative w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {streamer?.map((item: any) => (
              <div
                key={item.id}
                className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 sm:p-2"
              >
                <Card className="h-full transition-all duration-300 bg-zinc-100 border-none overflow-hidden shadow-none">
                  <CardContent className="p-0 aspect-square">
                    <div className="relative w-full h-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                      />
                    </div>
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
