"use client";
import { useAppSessionOrRedirect } from "@/entities/user/_vm/useAppSession";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useProductTableList } from "../_vm/useProductTableList";
import { useTableColumns } from "../_vm/useTabelColumns";
import { useProductRemoveConfirm } from "../_vm/useProductRemoveConfirm";
// import { useProductRemoveConfirm } from "../_vm/useProductRemoveConfirm";
// import { useProductUpdateModal } from "../_vm/useProductUpdateModal";

interface ProductTableProps extends HTMLAttributes<HTMLDivElement> {}

export const ProductTable: FC<ProductTableProps> = (props) => {
  const session = useAppSessionOrRedirect();

  const { productList, isPending: isPendingProductList } = useProductTableList(
    session!.user.id,
  );

  const {
    removeProductConfirm: onDeleteClick,
    isPending: isPendingRemoveProduct,
  } = useProductRemoveConfirm();

  // const { openUpdateModal: onUpdateClick } = useProductUpdateModal();

  // const isPendingComplexible = isPendingProductList || isPendingRemoveProduct;
  const productColumns = useTableColumns({
    onDeleteClick,
  });

  // if (isPendingComplexible) {
  //   return <Spinner aria-label="Profile loade..." />;
  // }
  return (
    <TableData
      columns={productColumns}
      data={productList}
      filterKey="name"
      isLoading={false}
    />
  );
};
