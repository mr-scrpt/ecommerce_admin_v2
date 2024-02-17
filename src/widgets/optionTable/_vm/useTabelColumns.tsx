import { ColumnDef } from "@tanstack/react-table";
import { optionColumns } from "../_data/columns";
import { OptionTableAction } from "../_ui/optionTableAction";
import { OptionColumnType } from "../_type/table.type";
import { RoutePathEnum } from "@/shared/config/routing.config";

interface HandlersProps {
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick } = handlers;

  const optionCollumnsWithAction: ColumnDef<OptionColumnType>[] = [
    ...optionColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <OptionTableAction
          data={row.original}
          onCopy={() => {}}
          hrefToUpdate={`${RoutePathEnum.OPTION_UPDATE}/${row.original.id}`}
          onDeleteClick={() => onDeleteClick(row.original.id)}
        />
      ),
    },
  ];

  return optionCollumnsWithAction;
};
