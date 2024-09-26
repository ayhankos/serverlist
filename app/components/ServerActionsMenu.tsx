import { Button } from "@/components/ui/button";
import { Copy, Columns, UserPlus, MoreHorizontal } from "lucide-react";
import { Server } from "@prisma/client";
import Link from "next/link";

const ServerActionsMenu = ({ server }: { server: Server }) => {
  return (
    <div className="flex-col flex">
      <Link href={`/servers/${server.slug}`} target="_blank">
        <Button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md">
          <span className="text-gray-700">Sunucu Detayları</span>
        </Button>
      </Link>
    </div>
  );
};

export default ServerActionsMenu;
