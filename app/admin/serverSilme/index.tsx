import { Server } from "@prisma/client";
import { ServerTable } from "./components/table";

export default function AdminServerSilme({ data }: { data: Server[] }) {
  return (
    <>
      <ServerTable data={data} />
    </>
  );
}
