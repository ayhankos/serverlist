import { Server } from "@prisma/client";
import { AdminServerForm } from "./adminServer";
import { StreamerForm } from "./adminStreamer";
import AdminServerSilme from "./serverSilme";
import { getServers } from "@/utils/servers/get";

export default async function AdminDashboard() {
  let data: Server[] = await getServers();
  return (
    <div className="container text-black h-screen">
      <h1 className="text-2xl font-bold mx-auto text-center pt-20">
        Admin Server Ekleme
      </h1>
      <AdminServerForm />
      <h1 className="text-2xl font-bold mx-auto text-center pt-20">
        Server Silme
      </h1>
      <AdminServerSilme data={data} />
      <h1 className="text-2xl font-bold mx-auto text-center pt-20">
        Yayinci Ekleme
      </h1>
      <StreamerForm />
    </div>
  );
}
