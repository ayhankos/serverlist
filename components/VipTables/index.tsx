"use client";
import React, { useState } from "react";
import useSWR from "swr";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, Star, Users } from "lucide-react";
import { Server } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import ServerActionsMenu from "@/app/components/ServerActionsMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <div className="relative h-14 w-14 flex items-center justify-center">
        <Image
          src={row.getValue("image")}
          alt={row.getValue("name")}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Sunucu Adı",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-800">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "Rank",
    header: "Rank",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <span className="text-red-700">{row.getValue("Rank")}</span>
      </div>
    ),
  },
  {
    accessorKey: "launchDate",
    header: "Açılış Tarihi",
    cell: ({ row }) => {
      const launchDate = new Date(row.getValue("launchDate"));
      const formattedDate = launchDate.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return (
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="text-blue-700">{formattedDate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "serverType",
    header: "Sunucu Tipi",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 text-amber-500" />
        <span className="text-amber-700">{row.getValue("serverType")}</span>
      </div>
    ),
  },
  {
    accessorKey: "playercount",
    header: "Oyuncu Sayısı",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <Users className="h-4 w-4 text-red-500" />
        <span className="font-semibold text-red-700">
          {row.getValue("playercount")}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const server = row.original;
      return <ServerActionsMenu server={server} />;
    },
  },
];

export function VipServerTable() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "Rank", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Rank: false,
    image: true,
    name: true,
    playercount: true,
    serverType: true,
    launchDate: true,
    actions: true,
  });
  const [rowSelection, setRowSelection] = useState({});

  const { data, error } = useSWR<Server[]>("/api/VipServers", fetcher);

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (error) {
    return (
      <Card className="w-full bg-red-50">
        <CardContent className="pt-6">
          <p className="text-center text-red-500">
            Sunucular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
            deneyin.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <Card className="w-full bg-zinc-200 rounded-xl border-none shadow-xl">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Table>
          <TableHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-none hover-none uppercase"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-lg font-medium">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center ml-2 p-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
