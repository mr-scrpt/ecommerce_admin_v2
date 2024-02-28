import { ColumnDef } from "@tanstack/react-table";
import { propertyColumns } from "../_data/columns";
import { PropertyTableAction } from "../_ui/propertyTableAction";
import { PropertyColumnType } from "../_type/table.type";
import { RoutePathEnum } from "@/shared/config/routing.config";

interface HandlersProps {
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick } = handlers;

  const propertyCollumnsWithAction: ColumnDef<PropertyColumnType>[] = [
    ...propertyColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <PropertyTableAction
          data={row.original}
          onCopy={() => {}}
          hrefToUpdate={`${RoutePathEnum.PROPERTY_UPDATE}/${row.original.id}`}
          onDeleteClick={() => onDeleteClick(row.original.id)}
        />
      ),
    },
  ];

  return propertyCollumnsWithAction;
};
