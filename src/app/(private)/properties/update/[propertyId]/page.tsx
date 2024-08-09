import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { PropertyUpdate } from "@/widgets/propertyUpdate";
import { FC } from "react";

interface PageProps {
  params: { propertyId: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
