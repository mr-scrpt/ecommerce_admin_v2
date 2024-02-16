"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useProductRemoveConfirm } from "../_vm/useProductRemoveConfirm";
import { useProductTableList } from "../_vm/useProductTableList";
import { useTableColumns } from "../_vm/useTabelColumns";

interface ProductTableProps extends HTMLAttributes<HTMLDivElement> {}

export const ProductTable: FC<ProductTableProps> = (props) => {
  const {
    productList,
    isPending: isPendingProductList,
    isFetchedAfterMount,
  } = useProductTableList();

  const {
    removeProductConfirm: onDeleteClick,
    isPending: isPendingRemoveProduct,
  } = useProductRemoveConfirm();

  const isPendingComplexible =
    isPendingProductList || isPendingRemoveProduct || !isFetchedAfterMount;

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
