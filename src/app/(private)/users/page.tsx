import { UserTable } from "@/widgets/userTable/userTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageUsers: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="text-3xl mb-2">Users</h1>
      <UserTable />
    </main>
  );
};
export default PageUsers;
