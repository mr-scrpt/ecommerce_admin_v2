"use client";
import { useAppSessionOrRedirect } from "@/entities/user/_vm/useAppSession";

import { UserForm } from "@/entities/user/_ui/userForm";
import { Spinner } from "@/shared/ui/icons/spinner";
import { TableData } from "@/shared/ui/tableData/ui/tableData";
import { ColumnDef } from "@tanstack/react-table";
import { FC, HTMLAttributes } from "react";
import { userColumns } from "./_data/columns";
import { useGetUserTableList } from "./_query/getUserTableList.query";
import { UserColumnType } from "./_type/table.type";
import { UserTableAction } from "./_ui/userTableAction";
import { useRemoveUser } from "./_vm/useRemoveUser";
import { useUpdateUser } from "./_vm/useUpdateUser";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  const session = useAppSessionOrRedirect();

  const { userList, isPending: isPendingUserList } = useGetUserTableList(
    session!.user.id,
  );

  const { removeUser, isPending: isPendingRemoveUser } = useRemoveUser();

  const { openUpdateModal } = useUpdateUser();

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
          onUpdateClick={() => {
            openUpdateModal(
              <UserForm
                user={{
                  name: "Test user",
                  email: "email.com",
                  emailVerified: new Date(),
                  image: "imgurl",
                  role: "ADMIN",
                }}
                handleSubmit={() => {}}
                submitText="Update user"
                isPending={false}
              />,
            );
          }}
          onDeleteClick={() => removeUser(row.original.id)}
        />
      ),
    },
  ];

  return (
    <>
      <TableData
        columns={userCollumnsWithAction}
        data={userList}
        filterKey="name"
        isLoading={false}
      />
      {/* <UserForm */}
      {/*   user={{ */}
      {/*     name: "Test user", */}
      {/*     email: "email.com", */}
      {/*     emailVerified: new Date(), */}
      {/*     image: "imgurl", */}
      {/*     role: "ADMIN", */}
      {/*   }} */}
      {/*   handleSubmit={() => {}} */}
      {/*   submitText="Update user" */}
      {/*   isPending={false} */}
      {/* /> */}
    </>
  );
};
