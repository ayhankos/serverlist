import { Streamer } from "@prisma/client";
import StreamerTable from "./components/table";

export default function AdminStreamerSilme({
  streamers,
}: {
  streamers: Streamer[];
}) {
  return (
    <>
      <StreamerTable streamers={streamers} />
    </>
  );
}
