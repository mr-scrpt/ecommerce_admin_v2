import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { StoreCreate } from "@/widgets/storeCreate";
import { FC } from "react";

const StoreCreatePage: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Store create" description="Create store item" />

      <StoreCreate callbackUrl={RoutePathEnum.STORES} />
    </main>
  );
};

export default StoreCreatePage;
