"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OptionColumnType } from "../_type/table.type";

export const optionColumns: ColumnDef<OptionColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
