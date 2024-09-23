"use client";
import React, { useState, useEffect } from "react";
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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Search,
  Server as ServerIcon,
  Users,
  Star,
  Calendar,
  Sword,
  Swords,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Server {
  id: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  playercount: string;
  feature: string;
}

const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "image",
    cell: ({ row }) => (
      <div className="relative h-20 w-20 flex items-center justify-center">
        <img
          src="/gifs/mavicerceve.gif"
          alt="flame-border"
          className="absolute inset-0 h-20 w-20 object-cover rounded-full"
        />
        <img
          src={row.getValue("image")}
          alt={row.getValue("name")}
          className="absolute h-14 w-14 rounded-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Sunucu Adı",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="font-medium text-indigo-700">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "playercount",
    header: "Oyuncu Sayısı",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <Users className="h-4 w-4 text-emerald-500" />
        <span className="font-semibold text-emerald-700">
          {row.getValue("playercount")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "serverType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Server Tipi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 text-amber-500" />
        <span className="text-amber-700">{row.getValue("serverType")}</span>
      </div>
    ),
  },
  {
    accessorKey: "launchDate",
    header: "Lansman Tarihi",
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const server = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menüyü aç</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white text-black">
            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(server.id)}
            >
              Sunucu ID&lsquo;sini Kopyala
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sunucu Detayları</DropdownMenuItem>
            <DropdownMenuItem>Sunucuya Katıl</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function VipServerTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Server[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/VipServers");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const servers = await response.json();
        setData(servers);
      } catch (e) {
        console.error("Fetching servers failed:", e);
        setError(
          "Sunucular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      }
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data,
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
          <p className="text-center text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-none shadow-xl">
      <CardHeader className="rounded-t-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold">Sunucu Listesi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="m-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="relative mb-4 sm:mb-0 w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-indigo-500" />
            <Input
              placeholder="Sunucu adına göre filtrele..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8 bg-white text-black border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-400"
              >
                Sütunlar <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-black">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Table>
            <TableHeader className="bg-gradient-to-r from-indigo-500 to-purple-500">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-none">
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
                    className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
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
          <div className="text-sm text-indigo-600">
            {table.getFilteredSelectedRowModel().rows.length} /{" "}
            {table.getFilteredRowModel().rows.length} satır seçildi.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
            >
              Önceki
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
            >
              Sonraki
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
