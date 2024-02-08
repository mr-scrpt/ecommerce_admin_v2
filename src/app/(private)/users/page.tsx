import { UserEventProvider } from "@/features/userUpdate/_vm/event/userProvider";
import { UserTable } from "@/widgets/userTable/userTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageUsers: FC<PageProps> = (props) => {
  return (
    <UserEventProvider test="ololol">
      <main className="flex min-h-screen flex-col  p-8">
        <h1 className="text-3xl mb-2">Users</h1>
        <UserTable></UserTable>
      </main>
    </UserEventProvider>
  );
};
export default PageUsers;
