import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { PropertyCreate } from "@/widgets/propertyCreate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PropertyCreatePage: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Property create" description="Create property item" />

      <PropertyCreate callbackUrl={RoutePathEnum.propertyS} />
    </main>
  );
};

export default PropertyCreatePage;
