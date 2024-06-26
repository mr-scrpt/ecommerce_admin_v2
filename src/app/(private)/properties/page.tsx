import { ToPropertyCreateButton } from "@/features/propertyCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { PropertyTable } from "@/widgets/propertyTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PagePropertys: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage
        title="Properties"
        description="Manage your properties list"
        action={
          <ToPropertyCreateButton route={RoutePathEnum.PROPERTY_CREATE} />
        }
      />
      <PropertyTable />
    </main>
  );
};
export default PagePropertys;
