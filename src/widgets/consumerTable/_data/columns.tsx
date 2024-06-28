"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConsumerColumnType } from "../_type/table.type";

export const consumerColumns: ColumnDef<ConsumerColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];
