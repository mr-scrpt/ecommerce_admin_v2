"use client";
import { useAppSessionOrRedirect } from "@/entities/user/_vm/useAppSession";

import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { ColumnDef } from "@tanstack/react-table";
import { FC, HTMLAttributes } from "react";
import { userColumns } from "./_data/columns";
import {
  useGetUserTableList,
  useInvalidateUserTableList,
} from "./_query/getUserTableList.query";
import { UserColumnType } from "./_type/table.type";
import { UserTableAction } from "./_ui/userTableAction";
import { useUserRemoveConfirm } from "./_vm/useUserRemoveConfirm";
import { useUserUpdateModal } from "./_vm/useUserUpdateModal";
import { useListenUserListUpdate } from "@/entities/user/_vm/event/useListenUserListUpdate";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  const session = useAppSessionOrRedirect();

  const { userList, isPending: isPendingUserList } = useGetUserTableList(
    session!.user.id,
  );

  // useInvalidateUserTableListSocket();
  useListenUserListUpdate();

  const { removeUserConfirm, isPending: isPendingRemoveUser } =
    useUserRemoveConfirm();
  const { openUpdateModal } = useUserUpdateModal();

  const isPendingComplexible = isPendingUserList || isPendingRemoveUser;

  const userCollumnsWithAction: ColumnDef<UserColumnType>[] = [
    ...userColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <UserTableAction
          data={row.original}
          onCopy={() => {}}
          onUpdateClick={() => openUpdateModal(row.original.id)}
          onDeleteClick={() => removeUserConfirm(row.original.id)}
        />
      ),
    },
  ];

  if (isPendingComplexible) {
    return <Spinner aria-label="Profile loade..." />;
  }
  return (
    <TableData
      columns={userCollumnsWithAction}
      data={userList}
      filterKey="name"
      isLoading={false}
    />
  );
};
