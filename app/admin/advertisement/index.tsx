"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Advertisement {
  id: string;
  location: string;
  imagePath: string;
}

interface AdLocation {
  location: string;
  ad: Advertisement | null;
}

export default function AdminAdvertisements() {
  const [adLocations, setAdLocations] = useState<AdLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await fetch("/api/advertisements", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setAdLocations(data);
      } else {
        console.error("Failed to fetch advertisements");
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (location: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("location", location);

    try {
      const response = await fetch("/api/advertisements", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { location, ad } = await response.json();
        setAdLocations((prevLocations) =>
          prevLocations.map((loc) =>
            loc.location === location ? { ...loc, ad } : loc
          )
        );
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Advertisements</h1>
      {adLocations.map(({ location, ad }) => (
        <div key={location} className="mb-4 p-4 border rounded">
          <p className="font-bold">{location}</p>
          {ad && (
            <div className="my-2">
              <Image
                src={ad.imagePath}
                alt={location}
                width={200}
                height={200}
                className="rounded border"
              />
              <p className="mt-2">
                Current image: {ad.imagePath.split("/").pop()}
              </p>
            </div>
          )}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                handleImageUpload(location, e.target.files[0]);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
