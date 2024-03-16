import { ColumnDef } from "@tanstack/react-table";
import { orderColumns } from "../_data/columns";
import { OrderTableAction } from "../_ui/orderTableAction";
import { OrderColumnType } from "../_type/table.type";
import { RoutePathEnum } from "@/shared/config/routing.config";

export const useTableColumns = () => {
  const orderCollumnsWithAction: ColumnDef<OrderColumnType>[] = [
    ...orderColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <OrderTableAction
          data={row.original}
          onCopy={() => {}}
          hrefToUpdate={`${RoutePathEnum.ORDER_UPDATE}/${row.original.id}`}
        />
      ),
    },
  ];

  return orderCollumnsWithAction;
};
