import { ColumnDef } from "@tanstack/react-table";
import { StoreTableAction } from "../_ui/storeTableAction";
import { StoreColumnType } from "../_type/table.type";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { storeColumns } from "../_data/columns";

interface HandlersProps {
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick } = handlers;

  const storeCollumnsWithAction: ColumnDef<StoreColumnType>[] = [
    ...storeColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <StoreTableAction
          data={row.original}
          onCopy={() => {}}
          hrefToUpdate={`${RoutePathEnum.STORE_UPDATE}/${row.original.id}`}
          onDeleteClick={() => onDeleteClick(row.original.id)}
        />
      ),
    },
  ];

  return storeCollumnsWithAction;
};
