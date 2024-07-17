"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useStaffTableList } from "../../_vm/staff/useStaffTableList";
import { useStaffUpdateModal } from "../../_vm/staff/useStaffUpdateModal";
import { useStaffRemoveConfirmModel } from "@/features/staffRemove";
import { useStaffTableColumns } from "../../_vm/staff/useTabelColumns";

interface StaffTableProps extends HTMLAttributes<HTMLDivElement> {}

export const StaffTable: FC<StaffTableProps> = (props) => {
  const {
    staffList,
    isPending: isPendingStaffList,
    isFetchedAfterMount,
  } = useStaffTableList();

  const { removeStaffConfirm: onDeleteClick, isPending: isPendingRemoveStaff } =
    useStaffRemoveConfirmModel();

  const { openUpdateModal: onUpdateClick } = useStaffUpdateModal();

  const isPendingComplexible =
    isPendingStaffList || isPendingRemoveStaff || !isFetchedAfterMount;

  const staffColumns = useStaffTableColumns({
    onDeleteClick,
    onUpdateClick,
  });

  if (isPendingComplexible) {
    return <Spinner aria-label="Profile loaded..." />;
  }
  return (
    <TableData
      columns={staffColumns}
      data={staffList}
      filterKey="name"
      isLoading={isPendingComplexible}
    />
  );
};
