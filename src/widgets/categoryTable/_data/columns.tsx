"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryColumnType } from "../_type/table.type";

export const categoryColumns: ColumnDef<CategoryColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
