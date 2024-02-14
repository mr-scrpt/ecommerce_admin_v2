import { ColumnDef } from "@tanstack/react-table";
import { productColumns } from "../_data/columns";
import { ProductTableAction } from "../_ui/productTableAction";
import { ProductColumnType } from "../_type/table.type";
import { RoutePathEnum } from "@/shared/config/routing.config";

interface HandlersProps {
  onDeleteClick: (id: string) => void;
}

export const useTableColumns = (handlers: HandlersProps) => {
  const { onDeleteClick } = handlers;

  const productCollumnsWithAction: ColumnDef<ProductColumnType>[] = [
    ...productColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <ProductTableAction
          data={row.original}
          onCopy={() => {}}
          hrefToUpdate={`${RoutePathEnum.PRODUCT_UPDATE}/${row.original.id}`}
          onDeleteClick={() => onDeleteClick(row.original.id)}
        />
      ),
    },
  ];

  return productCollumnsWithAction;
};
