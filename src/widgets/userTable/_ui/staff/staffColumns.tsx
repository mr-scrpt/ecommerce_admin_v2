"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StaffColumnType } from "../../_type/table.type";

export const StaffColumns: ColumnDef<StaffColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
