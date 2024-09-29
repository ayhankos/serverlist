import { AdminServerForm } from "./adminServer";
import { StreamerForm } from "./adminStreamer";
import AdminServerSilme from "./serverSilme";
import StreamerDelete from "./streamerSil";

export default async function AdminDashboard() {
  return (
    <div className="container text-black h-screen">
      <h1 className="text-2xl font-bold mx-auto text-center pt-20">
        Admin Server Ekleme
      </h1>
      <AdminServerForm />
      <h1 className="text-2xl font-bold mx-auto text-center pt-20">
        Server Silme
      </h1>
      <AdminServerSilme />
      <h1 className="text-2xl font-bold mx-auto text-center pt-20">
        Yayinci Ekleme
      </h1>
      <StreamerForm />
      <h1 className="text-2xl font-bold mx-auto text-center pt-20">
        Yayinci Silme
      </h1>
      <StreamerDelete />
    </div>
  );
}
