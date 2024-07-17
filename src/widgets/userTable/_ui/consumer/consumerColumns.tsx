"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConsumerColumnType } from "../../_type/table.type";

export const ConsumerColumns: ColumnDef<ConsumerColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
