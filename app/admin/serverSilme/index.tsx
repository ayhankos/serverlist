import React from "react";
import { Server } from "@prisma/client";
import { ServerTable } from "./components/table";

export default function AdminServerSilme({ data }: { data: Server[] }) {
  if (!data || data.length === 0) {
    return <div className="text-center py-4">No servers found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Server Listing</h2>
      <ServerTable data={data} />
    </div>
  );
}
