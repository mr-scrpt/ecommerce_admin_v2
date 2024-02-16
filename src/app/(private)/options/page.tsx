import { TitlePage } from "@/shared/ui/titlePage";
import { OptionTable } from "@/widgets/optionTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageOptions: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <TitlePage title="Options" description="Manage your options list" />
      <OptionTable />
    </main>
  );
};
export default PageOptions;
