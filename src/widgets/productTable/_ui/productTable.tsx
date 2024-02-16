"use client";
import { useAppSessionOrRedirect } from "@/entities/user/_vm/useAppSession";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useProductTableList } from "../_vm/useProductTableList";
import { useTableColumns } from "../_vm/useTabelColumns";
import { useProductRemoveConfirm } from "../_vm/useProductRemoveConfirm";

interface ProductTableProps extends HTMLAttributes<HTMLDivElement> {}

export const ProductTable: FC<ProductTableProps> = (props) => {
  const { productList, isPending: isPendingProductList } =
    useProductTableList();

  const {
    removeProductConfirm: onDeleteClick,
    isPending: isPendingRemoveProduct,
  } = useProductRemoveConfirm();

  const isPendingComplexible = isPendingProductList || isPendingRemoveProduct;
  const productColumns = useTableColumns({
    onDeleteClick,
  });

  if (isPendingComplexible) {
    return <Spinner aria-label="Product loaded..." />;
  }
  return (
    <TableData
      columns={productColumns}
      data={productList}
      filterKey="name"
      isLoading={false}
    />
  );
};