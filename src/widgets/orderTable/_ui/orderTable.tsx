"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useOrderTableList } from "../_vm/useOrderTableList";
import { useTableColumns } from "../_vm/useTabelColumns";

interface OrderTableProps extends HTMLAttributes<HTMLDivElement> {}

export const OrderTable: FC<OrderTableProps> = () => {
  const {
    orderList,
    isPending: isPendingOrderList,
    isFetchedAfterMount,
  } = useOrderTableList();

  const isPendingComplexible = isPendingOrderList || !isFetchedAfterMount;

  const orderColumns = useTableColumns();

  if (isPendingComplexible) {
    return <Spinner aria-label="Order loaded..." />;
  }

  return (
    <TableData
      columns={orderColumns}
      data={orderList}
      filterKey="name"
      isLoading={isPendingComplexible}
    />
  );
};
