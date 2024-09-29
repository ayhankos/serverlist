export const dynamic = "force-dynamic";

import { Streamer } from "@prisma/client";
import StreamerTable from "./components/table";

export default function AdminStreamerSilme() {
  return (
    <>
      <StreamerTable />
    </>
  );
}
