import { TitlePage } from "@/shared/ui/titlePage";
import { UserTable } from "@/widgets/userTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageUser: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Users" description="Manage store staff list" />
      <UserTable />
    </main>
  );
};
export default PageUser;
