import { PropertyId } from "@/entities/property";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { PropertyUpdate } from "@/widgets/optionUpdate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  params: { optionId: PropertyId };
}

const PropertyUpdatePage: FC<PageProps> = (props) => {
  const {
    params: { optionId },
  } = props;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Property update" description="Update option item" />
      <PropertyUpdate callbackUrl={RoutePathEnum.OPTIONS} optionId={optionId} />
    </main>
  );
};

export default PropertyUpdatePage;
