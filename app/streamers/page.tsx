import { Metadata } from "next";
import { getStreamers } from "@/utils/streamers/get";
import StreamersHeader from "./components/StreamersHeader";
import StreamersList from "./components/StreamersList";

export const metadata: Metadata = {
  title: "Streamers Dashboard",
  description: "Dashboard showcasing popular streamers.",
};

export default async function StreamersPage() {
  const streamers = await getStreamers();

  return (
    <div className="hidden md:block container ">
      <div className="h-full px-4 py-6 lg:px-8">
        <StreamersHeader />
        <StreamersList streamers={streamers} />
      </div>
    </div>
  );
}
