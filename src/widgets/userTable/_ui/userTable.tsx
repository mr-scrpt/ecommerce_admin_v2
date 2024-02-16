"use client";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useTableColumns } from "../_vm/useTabelColumns";
import { useUserRemoveConfirm } from "../_vm/useUserRemoveConfirm";
import { useUserTableList } from "../_vm/useUserTableList";
import { useUserUpdateModal } from "../_vm/useUserUpdateModal";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  const {
    userList,
    isPending: isPendingUserList,
    isFetchedAfterMount,
  } = useUserTableList();

  const { removeUserConfirm: onDeleteClick, isPending: isPendingRemoveUser } =
    useUserRemoveConfirm();

  const { openUpdateModal: onUpdateClick } = useUserUpdateModal();

  const isPendingComplexible =
    isPendingUserList || isPendingRemoveUser || !isFetchedAfterMount;
  const userColumns = useTableColumns({ onDeleteClick, onUpdateClick });

  if (isPendingComplexible) {
    return <Spinner aria-label="Profile loaded..." />;
  }
  return (
    <TableData
      columns={userColumns}
      data={userList}
      filterKey="name"
      isLoading={isPendingComplexible}
    />
  );
};
