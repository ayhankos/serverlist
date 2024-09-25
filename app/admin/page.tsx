"use client";

import { AdminServerForm } from "./adminServer";
import { StreamerForm } from "./adminStreamer";

export default function AdminDashboard() {
  return (
    <div className="container text-black">
      <h1 className="text-2xl font-bold mx-auto text-center pt-5">
        Admin Server Ekleme
      </h1>
      <AdminServerForm />
      <h1 className="text-2xl font-bold mx-auto text-center pt-10">
        Yayinci Ekleme
      </h1>
      <StreamerForm />
    </div>
  );
}
