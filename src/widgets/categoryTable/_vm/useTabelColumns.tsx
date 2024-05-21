import { ColumnDef } from "@tanstack/react-table";
import { categoryColumns } from "../_data/columns";
import { CategoryTableAction } from "../_ui/categoryTableAction";
import { CategoryColumnType } from "../_type/table.type";
import { RoutePathEnum } from "@/kernel/config/routing.config";

interface HandlersProps {
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick } = handlers;

  const categoryCollumnsWithAction: ColumnDef<CategoryColumnType>[] = [
    ...categoryColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <CategoryTableAction
          data={row.original}
          onCopy={() => {}}
          hrefToUpdate={`${RoutePathEnum.CATEGORY_UPDATE}/${row.original.id}`}
          onDeleteClick={() => onDeleteClick(row.original.id)}
        />
      ),
    },
  ];

  return categoryCollumnsWithAction;
};
