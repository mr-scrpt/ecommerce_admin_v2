import { ColumnDef } from "@tanstack/react-table";
import { userColumns } from "../_data/columns";
import { UserTableAction } from "../_ui/userTableAction";
import { UserColumnType } from "../_type/table.type";

interface HandlersProps {
  onUpdateClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick, onUpdateClick } = handlers;

  const userCollumnsWithAction: ColumnDef<UserColumnType>[] = [
    ...userColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <UserTableAction
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
