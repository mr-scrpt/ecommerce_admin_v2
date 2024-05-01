"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StoreColumnType } from "../_type/table.type";

export const storeColumns: ColumnDef<StoreColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "settlement",
    header: "Settlement",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
