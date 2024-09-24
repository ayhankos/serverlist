import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Columns, UserPlus, MoreHorizontal } from "lucide-react";
import { Server } from "@prisma/client";

const ServerActionsMenu = ({ server }: { server: Server }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="flex items-center space-x-2">
          <span className="sr-only">Menüyü aç</span>
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white text-black p-2 rounded-md shadow-lg w-48"
      >
        <DropdownMenuLabel className="font-medium text-gray-700 mb-2">
          İşlemler
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(server.id)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
        >
          <Copy className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Sunucu ID'sini Kopyala</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem
          onClick={() => (window.location.href = `/servers/${server.slug}`)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
        >
          <Columns className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Sunucu Detayları</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md">
          <UserPlus className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">
            Sunucuya Katıl ({server.serverType})
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerActionsMenu;
