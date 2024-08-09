import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { PropertyCreate } from "@/widgets/propertyCreate";
import { FC } from "react";

const PropertyCreatePage: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Property create" description="Create property item" />

      <PropertyCreate callbackUrl={RoutePathEnum.PROPERTIES} />
    </main>
  );
};

export default PropertyCreatePage;
