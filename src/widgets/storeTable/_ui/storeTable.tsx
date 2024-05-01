"use client";

import { useStoreRemoveConfirm } from "@/features/storeRemove";
import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useStoreTableList } from "../_vm/useStoreTableList";
import { useTableColumns } from "../_vm/useTabelColumns";

interface StoreTableProps extends HTMLAttributes<HTMLDivElement> {}

export const StoreTable: FC<StoreTableProps> = (props) => {
  const {
    storeList,
    isPending: isPendingStoreList,
    isFetchedAfterMount,
  } = useStoreTableList();

  const { removeStoreConfirm: onDeleteClick, isPending: isPendingRemoveStore } =
    useStoreRemoveConfirm();

  const isPendingComplexible =
    isPendingStoreList || isPendingRemoveStore || !isFetchedAfterMount;

  const storeColumns = useTableColumns({
    onDeleteClick,
  });

  if (isPendingComplexible) {
    return <Spinner aria-label="Store loaded..." />;
  }
  console.log("output_log:  =>>>", storeList);

  return (
    <TableData
      columns={storeColumns}
      data={storeList}
      filterKey="settlement"
      isLoading={isPendingComplexible}
    />
  );
};
