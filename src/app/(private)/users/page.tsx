import {
  useListenUserListUpdate,
  useListenUserUpdate,
} from "@/entities/user/user";
import { UserTable } from "@/widgets/userTable/userTable";
import { FC, HTMLAttributes } from "react";
// import { Listener } from "./(event)/listener";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageUsers: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="text-3xl mb-2">Users</h1>
      <UserTable></UserTable>
    </main>
  );
};
export default PageUsers;
