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
import { ArrowUpDown, Calendar, Globe, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import ServerActionsMenu from "@/app/components/ServerActionsMenu";
import { Server } from "@prisma/client";
import { Input } from "../ui/input";
import { FaDiscord } from "react-icons/fa";
import { SiWebtrees } from "react-icons/si";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <div className="relative w-14 h-14 overflow-hidden rounded-full">
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
        <span className=" text-gray-800 whitespace-nowrap">
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
      <div className="items-center min-w-60 px-3">
        <span className=" text-red-700 max-w-[300px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[600px] whitespace-normal break-words">
          {row.getValue("detaylar")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "serverType",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sunucu Tipi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center  items-center space-x-1">
        <span className="text-amber-700 whitespace-nowrap">
          {row.getValue("serverType")}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "Rank",
    header: ({ column }) => {
      return <div className="flex ">Rank</div>;
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
      return <div className="text-center">Açılış Tarihi</div>;
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
          <span className="text-blue-700 whitespace-nowrap">
            {formattedDate}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "cekilis",
    header: ({ column }) => {
      return <div className="text-center justify-start ">Çekiliş</div>;
    },
    cell: ({ row }) => (
      <div className=" items-center">
        <a
          href="https://discord.com/invite/pvpserverlar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-green-700 hover:bg-green-900 text-white  py-2 px-4 rounded transition duration-200">
            Çekiliş
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
              <SiWebtrees className="h-8 w-8" style={{ color: "#424242" }} />
            </a>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalClicks",
    header: ({ column }) => {
      return <div className="text-center">Görüntülenme</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">
        <span className="text-purple-700 font-semibold">
          {row.getValue("totalClicks")}
        </span>
      </div>
    ),
  },
];

export function RegularServerTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Rank: false,
    image: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, error, isLoading } = useSWR<{
    servers: Server[];
    totalCount: number;
  }>(`/api/RegularServers?page=${currentPage}&pageSize=${pageSize}`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 50000,
  });

  const table = useReactTable({
    data: data?.servers || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-blue-50">
        <CardContent className="pt-6">
          <p className="text-center text-blue-500">Sunucular yükleniyor...</p>
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Card className="w-full rounded-xl border-none bg-zinc-100 shadow-none">
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
                    <TableHead key={header.id} className="text-white font-bold">
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
          <TableBody className="text-lg font-bold">
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
      <div className="mt-4 flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
          >
            Önceki
          </Button>
          <span className="mx-2">
            Sayfa
            <strong>
              {currentPage} / {totalPages}
            </strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
          >
            Sonraki
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          Toplam {data?.totalCount || 0} sunucu
        </div>
      </div>
    </Card>
  );
}
