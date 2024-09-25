import { Button } from "@/components/ui/button";
import { Copy, Columns, UserPlus, MoreHorizontal } from "lucide-react";
import { Server } from "@prisma/client";

const ServerActionsMenu = ({ server }: { server: Server }) => {
  return (
    <div className="flex-col flex">
      <Button
        onClick={() => (window.location.href = `/servers/${server.slug}`)}
        className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
      >
        <span className="text-gray-700">Sunucu Detayları</span>
      </Button>
    </div>
  );
};

export default ServerActionsMenu;
