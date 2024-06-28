import { TitlePage } from "@/shared/ui/titlePage";
import { UserTable } from "@/widgets/consumerTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageStaff: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Staff" description="Manage store staff list" />
      <UserTable />
    </main>
  );
};
export default PageStaff;
