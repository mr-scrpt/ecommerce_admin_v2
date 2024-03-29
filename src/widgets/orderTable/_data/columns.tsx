"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OrderColumnType } from "../_type/table.type";

export const orderColumns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
