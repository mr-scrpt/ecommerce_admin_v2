import { ColumnDef } from "@tanstack/react-table";
import { consumerColumns } from "../_data/columns";
import { ConsumerTableAction } from "../_ui/consumerTableAction";
import { ConsumerColumnType } from "../_type/table.type";

interface HandlersProps {
  onUpdateClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick, onUpdateClick } = handlers;

  const consumerCollumnsWithAction: ColumnDef<ConsumerColumnType>[] = [
    ...consumerColumns,
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

  return consumerCollumnsWithAction;
};
