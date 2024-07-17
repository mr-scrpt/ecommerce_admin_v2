import { ColumnDef } from "@tanstack/react-table";
import { StaffColumnType } from "../../_type/table.type";
import { StaffColumns } from "../../_ui/staff/staffColumns";
import { StaffTableAction } from "../../_ui/staff/staffTableAction";

interface HandlersProps {
  onUpdateClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const useStaffTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick, onUpdateClick } = handlers;

  const userCollumnsWithAction: ColumnDef<StaffColumnType>[] = [
    ...StaffColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <StaffTableAction
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
