import { OptionCreateButton } from "@/features/optionCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { OptionTable } from "@/widgets/optionTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageOptions: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage
        title="Options"
        description="Manage your options list"
        action={<OptionCreateButton route={RoutePathEnum.OPTION_CREATE} />}
      />
      <OptionTable />
    </main>
  );
};
export default PageOptions;
