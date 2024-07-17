"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useConsumerTableColumns } from "../../_vm/consumer/useUserTabelColumns";
import { useConsumerTableList } from "../../_vm/consumer/useConsumerTableList";
import { useConsumerRemoveConfirmModel } from "@/features/consumerRemove";
import { useConsumerUpdateModal } from "../../_vm/consumer/useConsumerUpdateModal";

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
  const consumerColumns = useConsumerTableColumns({
    onDeleteClick,
    onUpdateClick,
  });

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
