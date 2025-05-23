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
import { Calendar, Eye, Star, Users } from "lucide-react";
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
import { Globe } from "lucide-react";
import { FaDiscord, FaEye } from "react-icons/fa";
import { SiWebtrees } from "react-icons/si";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <div className="relative w-10 h-10 overflow-hidden rounded-full mr-4 ml-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={row.getValue("image")}
            alt={row.getValue("name")}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="flex ">Sunucu Adı</div>;
    },
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className=" text-sky-700 whitespace-nowrap">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "detaylar",
    header: ({ column }) => {
      return <div className="items-center text-center">Sunucu Detayları</div>;
    },
    cell: ({ row }) => (
      <div className="items-center px-2 sm:px-2 md:px-4 lg:px-8 min-w-[200px]">
        <span className="text-gray-950 whitespace-pre-wrap">
          {row.getValue("detaylar")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "serverType",
    header: ({ column }) => {
      return <div className="text-center ">Sunucu Tipi</div>;
    },
    cell: ({ row }) => (
      <div className="text-center  items-center space-x-1">
        <span className="text-gray-800 whitespace-nowrap">
          {row.getValue("serverType")}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "Rank",
    header: ({ column }) => {
      return <div className="flex">Rank</div>;
    },
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-red-700 whitespace-nowrap">
          {row.getValue("Rank")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "launchDate",
    header: ({ column }) => {
      return <div className="text-center mr-2 ">Açılış Tarihi</div>;
    },
    cell: ({ row }) => {
      const launchDate = new Date(row.getValue("launchDate"));
      const formattedDate = launchDate.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return (
        <div className="text-center  items-center ">
          <span className="text-sky-700 whitespace-nowrap">
            {formattedDate}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "cekilis",
    header: ({ column }) => {
      return <div className="text-center justify-start">Çekiliş</div>;
    },
    cell: ({ row }) => (
      <div className=" items-center">
        <a
          href="https://discord.com/invite/pvpserverlar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gray-900 hover:bg-gray-900 text-yellow-400 py-1 px-2 font-medium rounded-xl transition duration-200">
            Katıl
          </button>
        </a>
      </div>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => {
      return <div className="flex justify-start">Sunucu Url</div>;
    },
    cell: ({ row }) => {
      const dcLink = row.original.dcLink;
      const webLink = row.original.webLink;
      const serverId = row.original.id;

      const trackClick = async (clickType: "dc" | "web") => {
        try {
          const response = await fetch("/api/trackClick", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              serverId,
              clickType,
            }),
          });

          if (!response.ok) {
            console.error("Error tracking click");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      return (
        <div className="flex space-x-2">
          {dcLink && (
            <a
              href={dcLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white rounded-full hover:scale-110 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              title="Discord Sunucusu"
              onClick={() => trackClick("dc")}
            >
              <FaDiscord className="h-8 w-8" style={{ color: "#7289DA" }} />
            </a>
          )}
          {webLink && (
            <a
              href={webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white rounded-full hover:scale-110 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title="Web Sitesi"
              onClick={() => trackClick("web")}
            >
              <Globe className="h-8 w-8" style={{ color: "#000000" }} />
            </a>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalClicks",
    header: ({ column }) => {
      return <div className="items-center w-14 text-center"></div>;
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center space-x-2">
        <span className="text-sky-700 font-semibold">
          {row.getValue("totalClicks")}
        </span>
        <FaEye className="h-8 w-8 mr-2" />
      </div>
    ),
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
    detaylar: true,
    serverType: true,
    launchDate: true,
    actions: true,
  });
  const [rowSelection, setRowSelection] = useState({});

  const { data, error } = useSWR<Server[]>("/api/VipServers", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 50000,
  });

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
    <div className="relative group card">
      <Card className="w-full bg-zinc-200 rounded-xl border-none shadow-xl">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Table>
            <TableHeader className="bg-gradient-to-r from-gray-900 to-gray-800 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-none hover-none uppercase"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-white font-bold"
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
            <TableBody className="text-lg font-semibold">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-0 text-center">
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
    </div>
  );
}
