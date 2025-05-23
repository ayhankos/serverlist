"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";
import { FaDiscord, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });

interface StreamerData {
  id: number;
  name: string;
  image: string;
  ytLink: string;
  dcLink: string;
}

export default function Streamers() {
  const { data: streamers, error } = useSWR<StreamerData[]>(
    "/api/vipStreamers",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 50000,
    }
  );

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

  if (error) {
    return (
      <p className="text-red-500">
        Hata: Sunucular yüklenirken bir hata oluştu.
      </p>
    );
  }

  if (!streamers) {
    return <p className="text-black">Yükleniyor...</p>;
  }

  return (
    <Card className="w-full border-none bg-zinc-100 shadow-none card">
      <CardContent className="p-2 sm:p-4  shadow-none ">
        <div className="relative w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {streamers.map((item) => (
              <div
                key={item.id}
                className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 sm:p-2"
              >
                <Card className="h-full transition-all duration-300 bg-zinc-100 overflow-hidden shadow-none ">
                  <CardContent className="p-0 ">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-full aspect-square">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 object-cover rounded-full"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className="flex justify-center gap-4 mt-2 pb-2">
                        {item.ytLink && (
                          <Link
                            href={item.ytLink}
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
                        {item.dcLink && (
                          <Link
                            href={item.dcLink}
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
