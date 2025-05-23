"use client";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Server } from "@prisma/client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";
import { ServerEditModal } from "./ServerEditModal";

interface ServerActionsProps {
  data: Server;
}

export const ServerActions: React.FC<ServerActionsProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true);
    const serverId = data.id;
    try {
      const res = await fetch("/api/serverSil", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serverId }),
      });

      if (res.ok) {
        mutate("/api/adminServers");
        mutate("/api/VipServers");
      } else {
        console.error("Failed to delete server.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the server:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      {showEditModal && (
        <ServerEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          server={data}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
