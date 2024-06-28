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
import { ConsumerColumnType } from "../_type/table.type";

interface ConsumerTableListActionProps extends HTMLAttributes<HTMLDivElement> {
  data: ConsumerColumnType;
  onCopy: () => void;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
}

export const ConsumerTableAction: FC<ConsumerTableListActionProps> = memo(
  (props) => {
    const { onCopy, onDeleteClick: onDeletePopup, onUpdateClick } = props;
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
          <DropdownMenuItem onClick={onUpdateClick}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeletePopup}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

ConsumerTableAction.displayName = "ConsumerTableAction";
