"use client";
import { useAppSessionOrRedirect } from "@/entities/user/_vm/useAppSession";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { FC, HTMLAttributes } from "react";
import { useGetUserTableList } from "./_vm/useUserTableList.query";
import { useTableColumns } from "./_vm/useTabelColumns";
import { useUserRemoveConfirm } from "./_vm/useUserRemoveConfirm";
import { useUserUpdateModal } from "./_vm/useUserUpdateModal";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  const session = useAppSessionOrRedirect();

  const { userList, isPending: isPendingUserList } = useGetUserTableList(
    session!.user.id,
  );

  const { removeUserConfirm: onDeleteClick, isPending: isPendingRemoveUser } =
    useUserRemoveConfirm();

  const { openUpdateModal: onUpdateClick } = useUserUpdateModal();

  const isPendingComplexible = isPendingUserList || isPendingRemoveUser;
  const userColumns = useTableColumns({ onDeleteClick, onUpdateClick });

  if (isPendingComplexible) {
    return <Spinner aria-label="Profile loade..." />;
  }
  return (
    <TableData
      columns={userColumns}
      data={userList}
      filterKey="name"
      isLoading={false}
    />
  );
};
