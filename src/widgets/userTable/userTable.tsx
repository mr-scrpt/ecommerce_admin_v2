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
  useInvalidateUserTableListSocket,
} from "./_query/getUserTableList.query";
import { UserColumnType } from "./_type/table.type";
import { UserTableAction } from "./_ui/userTableAction";
import { useUserRemoveConfirm } from "./_vm/useUserRemoveConfirm";
import { useUserUpdateModal } from "./_vm/useUserUpdateModal";
import { UserFormUpdate } from "@/features/userUpdate";
import { useSocket, useSocketHandler } from "@/shared/lib/socket";
import { Button } from "@/shared/ui/button";
// import { useUserUpdateContext } from "@/features/userUpdate/_vm/event/userProvider";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  const session = useAppSessionOrRedirect();
  // const userUpdate = useUserUpdateContext();

  const { userList, isPending: isPendingUserList } = useGetUserTableList(
    session!.user.id,
  );
  console.log("output_log: before listen =>>>");
  // useInvalidateUserTableListSocket();
  // useSocketHandler("user-update", () => {
  //   console.log("output_log: is user update =>>>");
  //   useInvalidateUserTableList()
  // });
  useSocketHandler("user-refresh", () => {
    console.log("output_log: listen update user =>>>");
    // queryClient.invalidateQueries({
    //   queryKey: [baseKey, "getUserTableList"],
    // });
  });

  const { removeUser, isPending: isPendingRemoveUser } = useUserRemoveConfirm();
  // const { updateUser, isPending: isPendingUpdateUser } = useUserUpdateModal();
  const { openUpdateModal } = useUserUpdateModal();

  // const { openUpdateModal } = useUpdateUser();

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
          // onUpdateClick={() => {
          //   openUpdateModal(
          //     <UserForm
          //       user={{
          //         name: "Test user",
          //         email: "email.com",
          //         emailVerified: new Date(),
          //         image: "imgurl",
          //         role: "ADMIN",
          //       }}
          //       handleSubmit={() => {}}
          //       submitText="Update user"
          //       isPending={false}
          //     />,
          //   );
          // }}
          onUpdateClick={() => {
            // userUpdate();
            openUpdateModal(row.original.id);
          }}
          onDeleteClick={() => removeUser(row.original.id)}
        />
      ),
    },
  ];

  const socket = useSocket();
  if (isPendingComplexible) {
    return <Spinner aria-label="Profile loade..." />;
  }
  return (
    <>
      {/* <UserFormUpdate userId={"admin_fdsfsddfew789879"} /> */}
      <Button
        onClick={() => {
          socket.emit("user-update");
        }}
      >
        Reinit
      </Button>
      <TableData
        columns={userCollumnsWithAction}
        data={userList}
        filterKey="name"
        isLoading={false}
      />
      {/* <Button */}
      {/*   onClick={() => { */}
      {/*     console.log("output_log: click socket =>>>"); */}
      {/*     socket.emit("updated-user", { boardId: "cc" }); */}
      {/*   }} */}
      {/* > */}
      {/*   Send */}
      {/* </Button> */}
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
