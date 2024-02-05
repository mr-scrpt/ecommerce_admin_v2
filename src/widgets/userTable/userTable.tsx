"use client";
import { useAppSessionOrRedirect } from "@/entities/user/_vm/useAppSession";

import { getUserListQuery, useUserList } from "@/entities/user/user";
import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { FC, HTMLAttributes, useMemo } from "react";
import { UserColumnType } from "./_type/table.type";
import { userColumns } from "./_data/columns";
import { UserTableAction } from "./_ui/userTableAction";
import { useRemoveUser } from "./_vm/useRemoveUser";
import { useUserTableList } from "./_query/getUserTableList.query";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  const session = useAppSessionOrRedirect();

  const { userList, isPending: isPendingUserList } = useUserTableList(
    session!.user.id,
  );
  const { removeUser, isPending: isPendingRemoveUser } = useRemoveUser();

  // const userList = data.userList ?? [];

  // const listFormated = useMemo(
  //   () => userList.map((item) => buildBillboardRow(item)),
  //   [userList],
  // );
  const isPendingComplexible = isPendingUserList || isPendingRemoveUser;

  if (isPendingComplexible) {
    return <Spinner aria-label="Profile loade..." />;
  }

  const userCollumnsWithAction: ColumnDef<UserColumnType>[] = [
    ...userColumns,
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <UserTableAction
          data={row.original}
          onCopy={() => {}}
          hrefUpdate={""}
          onDeletePopup={() => removeUser(row.original.id)}
        />
      ),
    },
  ];

  return (
    <TableData
      columns={userCollumnsWithAction}
      data={userList}
      filterKey="name"
      isLoading={false}
    />
  );
};
