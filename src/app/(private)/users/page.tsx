import { UserTable } from "@/widgets/userTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageUsers: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="mb-2 text-3xl">Users</h1>
      <UserTable />
    </main>
  );
};
export default PageUsers;
