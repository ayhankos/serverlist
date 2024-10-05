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
      <div className="relative h-14 w-14 flex items-center justify-center">
        <img
          src={row.getValue("image")}
          alt={row.getValue("name")}
          className="rounded-full object-cover"
          style={{
            width: "56px",
            height: "56px",
          }}
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
    accessorKey: "detaylar",
    header: "Sunucu Detayları",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <span className="font-semibold text-red-700">
          {row.getValue("detaylar")}
        </span>
      </div>
    ),
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
    accessorKey: "cekilis",
    header: "Çekiliş",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <a
          href="https://discord.com/invite/pvpserverlar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
            Çekiliş
          </button>
        </a>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Sunucu Url",
    enableHiding: false,
    cell: ({ row }) => {
      const dcLink = row.original.dcLink;
      const webLink = row.original.webLink;
      return (
        <div className="flex space-x-2">
          {dcLink && (
            <a
              href={dcLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white  rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              title="Discord Sunucusu"
            >
              <FaDiscord className="h-8 w-8" style={{ color: "#7289DA" }} />
            </a>
          )}
          {webLink && (
            <a
              href={webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white  rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title="Web Sitesi"
            >
              <SiWebtrees className="h-8 w-8" style={{ color: "#424242" }} />
            </a>
          )}
        </div>
      );
    },
  },
];

export function RegularServerTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
      <CardContent>
        <div className="m-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="relative mb-4 sm:mb-0 w-1/3 mt-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-600" />
            <Input
              placeholder="Sunucu adına göre filtrele..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8 bg-white text-black"
            />
          </div>
        </div>
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
                      <TableCell
                        key={cell.id}
                        className="p-0 text-center ml-2 pl-2"
                      >
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
      </CardContent>
    </Card>
  );
}
