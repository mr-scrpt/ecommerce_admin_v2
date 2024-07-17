import { ColumnDef } from "@tanstack/react-table";
import { ConsumerColumnType } from "../../_type/table.type";
import { ConsumerColumns } from "../../_ui/consumer/consumerColumns";
import { ConsumerTableAction } from "../../_ui/consumer/consumerTableAction";

interface HandlersProps {
  onUpdateClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const useConsumerTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick, onUpdateClick } = handlers;

  const userCollumnsWithAction: ColumnDef<ConsumerColumnType>[] = [
    ...ConsumerColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <ConsumerTableAction
          data={row.original}
          onCopy={() => {}}
          onUpdateClick={() => onUpdateClick(row.original.id)}
          onDeleteClick={() => onDeleteClick(row.original.id)}
        />
      ),
    },
  ];

  return userCollumnsWithAction;
};
