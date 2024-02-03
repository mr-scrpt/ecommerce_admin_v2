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
import { useUserTableList } from "@/entities/user/_query/user.query";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  const session = useAppSessionOrRedirect();

  // const { isPending, data } = useQuery({
  //   ...getUserListQuery(session!.user.id),
  // });
  const { userList, isPending } = useUserTableList(session!.user.id);

  // const userList = data.userList ?? [];

  // const listFormated = useMemo(
  //   () => userList.map((item) => buildBillboardRow(item)),
  //   [userList],
  // );

  if (isPending) {
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
          onDeletePopup={() => {}}
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
