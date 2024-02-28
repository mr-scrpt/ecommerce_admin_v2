import { PropertyId } from "@/entities/property";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { PropertyUpdate } from "@/widgets/propertyUpdate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  params: { propertyId: PropertyId };
}

const PropertyUpdatePage: FC<PageProps> = (props) => {
  const {
    params: { propertyId },
  } = props;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Property update" description="Update property item" />
      <PropertyUpdate
        callbackUrl={RoutePathEnum.PROPERTIES}
        propertyId={propertyId}
      />
    </main>
  );
};

export default PropertyUpdatePage;
