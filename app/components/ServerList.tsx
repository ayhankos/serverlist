import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useSWR from "swr";

interface Server {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  feature: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServerList: React.FC = () => {
  const { data: servers, error } = useSWR<Server[]>("/api/servers", fetcher);
  const [filter, setFilter] = useState<string>("all");

  if (error)
    return (
      <div className="text-red-500">
        Sunucu listesi yüklenirken bir hata oluştu.
      </div>
    );
  if (!servers) return <div className="text-blue-400">Yükleniyor...</div>;

  const filteredServers = servers.filter((server) => {
    if (filter === "all") return true;
    return server.feature === filter;
  });

  return (
    <div className="container mt-12">
      <div className="mb-6">
        <button
          onClick={() => setFilter("55-120")}
          className={`mr-2 px-4 py-2 rounded ${
            filter === "55-120" ? "bg-blue-500 text-white" : "bg-gray-700"
          }`}
        >
          55-120
        </button>
        <button
          onClick={() => setFilter("1-99")}
          className={`mr-2 px-4 py-2 rounded ${
            filter === "1-99" ? "bg-blue-500 text-white" : "bg-gray-700"
          }`}
        >
          1-99
        </button>
        <button
          onClick={() => setFilter("55-250")}
          className={`mr-2 px-4 py-2 rounded ${
            filter === "55-250" ? "bg-blue-500 text-white" : "bg-gray-700"
          }`}
        >
          55-250
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`mr-2 px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-700"
          }`}
        >
          All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServers.map((server) => (
          <motion.div
            key={server.id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-lg shadow-xl group"
          >
            <Link
              className="block relative h-full w-full"
              href={`/server/${server.slug}`}
              target="_blank"
              passHref
            >
              <div className="relative h-full group">
                <img
                  src={server.image}
                  alt={server.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  style={{ maxHeight: "300px" }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold mb-2">
                    {server.name}
                  </h3>
                  <p className="text-gray-200 text-sm">{server.feature}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServerList;
