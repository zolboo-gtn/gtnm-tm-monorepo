"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Role, SelectUser } from "api";
import dayjs from "dayjs";
import Link from "next/link";
import { DataTable, DataTablePagination } from "ui";

type Props = {
  data: SelectUser[];
};
export const UsersTable: React.FC<
  React.Translations<"roles" | "users"> & Props
> = ({ data, translations }) => {
  const columns: ColumnDef<SelectUser>[] = [
    {
      accessorKey: "id",
      header: translations.users.id,
    },
    {
      accessorKey: "email",
      header: translations.users.email,
      cell: ({ row }) => (
        <Link className="underline" href={`/users/${row.getValue("id")}`}>
          {row.getValue("email")}
        </Link>
      ),
    },
    {
      accessorKey: "name",
      header: translations.users.name,
    },
    {
      accessorKey: "role",
      header: translations.users.role,
      cell: ({ row }) => {
        const role = row.getValue<Role>("role");
        return translations.roles[role];
      },
    },
    {
      accessorKey: "createdAt",
      header: translations.users.createdAt,
      cell: ({ row }) => {
        const value = row.getValue<string>("createdAt");
        return dayjs(value).format("YYYY-MM-DD hh:mm:ss");
      },
    },
    {
      accessorKey: "updatedAt",
      header: translations.users.updatedAt,
      cell: ({ row }) => {
        const value = row.getValue<string>("updatedAt");
        return dayjs(value).format("YYYY-MM-DD hh:mm:ss");
      },
    },
    {
      accessorKey: "deletedAt",
      header: translations.users.deletedAt,
      cell: ({ row }) => {
        const value = row.getValue<string>("deletedAt");
        return value ? dayjs(value).format("YYYY-MM-DD hh:mm:ss") : "-";
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} />
      <DataTablePagination columns={columns} data={data} />
    </div>
  );
};
