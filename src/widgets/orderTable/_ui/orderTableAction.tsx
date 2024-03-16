"use client";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { FC, HTMLAttributes, memo } from "react";
import { OrderColumnType } from "../_type/table.type";
import Link from "next/link";

interface OrderTableListActionProps extends HTMLAttributes<HTMLDivElement> {
  data: OrderColumnType;
  onCopy: () => void;
  hrefToUpdate: string;
}

export const OrderTableAction: FC<OrderTableListActionProps> = memo((props) => {
  const { onCopy, hrefToUpdate } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            onCopy();
          }}
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={hrefToUpdate} className="flex w-full items-center">
            <Edit className="mr-2 h-4 w-4" /> Update
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

OrderTableAction.displayName = "OrderTableAction";
