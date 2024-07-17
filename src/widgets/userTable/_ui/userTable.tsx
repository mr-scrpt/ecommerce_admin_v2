import { FC, HTMLAttributes } from "react";
import { UserTableLayout } from "./userTable.layout";
import { ConsumerTable } from "./consumer/consumerTable";
import { StaffTable } from "./staff/staffTable";

interface UserTableProps extends HTMLAttributes<HTMLDivElement> {}

export const UserTable: FC<UserTableProps> = (props) => {
  return (
    <UserTableLayout
      slotConsumer={<ConsumerTable />}
      slotStaff={<StaffTable />}
    />
  );
};
