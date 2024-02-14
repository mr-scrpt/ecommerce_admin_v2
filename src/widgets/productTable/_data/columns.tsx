"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductColumnType } from "../_type/table.type";

export const productColumns: ColumnDef<ProductColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
