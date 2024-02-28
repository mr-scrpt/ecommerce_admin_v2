"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PropertyColumnType } from "../_type/table.type";

export const propertyColumns: ColumnDef<PropertyColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
