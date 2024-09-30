"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowBigDown } from "lucide-react";
import { FcApproval } from "react-icons/fc";
import Image from "next/image";

async function getServerData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/server/${slug}`
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.error("API Hatası:", res.status);
    return null;
  }

  return res.json();
}

interface ServerData {
  name: string;
  description: string;
  feature: string;
  detaylar: number;
  launchDate: string;
  image: string;
}

export default function ServerPage({ params }: { params: { slug: string } }) {
  const [server, setServer] = useState<ServerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServerData(params.slug);
      if (!data) {
        notFound();
      } else {
        setServer(data);
      }
    };

    fetchData();
  }, [params.slug]);

  if (!server) {
    return null;
  }

  const features = server.feature ? server.feature.split(",") : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-black relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-4xl w-full m-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Image
            src={server.image}
            alt={server.name}
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-bold mb-6 text-white text-center uppercase"
        >
          {server.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl mb-8 text-gray-300 text-center px-20"
        >
          {server.description.split(".").map((line, index) => (
            <div key={index} className="mb-6">
              <FcApproval className="inline-block mr-2" />
              {line.trim()}
              {line.trim() ? "." : ""}
            </div>
          ))}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-500 to-gray-700 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">
              İstatistikler
            </h2>
            <p className="mb-4 text-gray-300 text-lg">
              <strong>Server Detaylari:</strong> {server.detaylar}
            </p>
            <p className="text-gray-300 text-lg">
              <strong>Açılış Tarihi:</strong>{" "}
              {new Date(server.launchDate).toLocaleDateString()}
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out w-full md:w-auto hover:bg-gradient-to-t hover:from-gray-800 hover:to-gray-900"
          >
            Sunucuya Katıl
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-75" />
    </div>
  );
}
