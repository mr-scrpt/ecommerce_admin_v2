"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserColumnType } from "../_type/table.type";

export const userColumns: ColumnDef<UserColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
