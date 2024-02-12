import { ColumnDef } from "@tanstack/react-table";
import { categoryColumns } from "../_data/columns";
import { CategoryTableAction } from "../_ui/categoryTableAction";
import { CategoryColumnType } from "../_type/table.type";

interface HandlersProps {
  onUpdateClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick, onUpdateClick } = handlers;

  const categoryCollumnsWithAction: ColumnDef<CategoryColumnType>[] = [
    ...categoryColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <CategoryTableAction
          data={row.original}
          onCopy={() => {}}
          onUpdateClick={() => onUpdateClick(row.original.id)}
          onDeleteClick={() => onDeleteClick(row.original.id)}
        />
      ),
    },
  ];

  return categoryCollumnsWithAction;
};
