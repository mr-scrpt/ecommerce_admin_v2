"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useTableColumns } from "../_vm/useTabelColumns";
import { useConsumerTableList } from "../_vm/useConsumerTableList";
import { useConsumerRemoveConfirmModel } from "@/features/consumerRemove";
import { useConsumerUpdateModal } from "../_vm/useConsumerUpdateModal";

interface ConsumerTableProps extends HTMLAttributes<HTMLDivElement> {}

export const ConsumerTable: FC<ConsumerTableProps> = (props) => {
  const {
    consumerList,
    isPending: isPendingConsumerList,
    isFetchedAfterMount,
  } = useConsumerTableList();

  const {
    removeConsumerConfirm: onDeleteClick,
    isPending: isPendingRemoveConsumer,
  } = useConsumerRemoveConfirmModel();

  const { openUpdateModal: onUpdateClick } = useConsumerUpdateModal();

  const isPendingComplexible =
    isPendingConsumerList || isPendingRemoveConsumer || !isFetchedAfterMount;
  const consumerColumns = useTableColumns({ onDeleteClick, onUpdateClick });

  if (isPendingComplexible) {
    return <Spinner aria-label="Profile loaded..." />;
  }
  return (
    <TableData
      columns={consumerColumns}
      data={consumerList}
      filterKey="name"
      isLoading={isPendingComplexible}
    />
  );
};
