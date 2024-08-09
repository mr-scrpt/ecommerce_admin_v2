import { ToStoreCreateButton } from "@/features/storeCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { StoreTable } from "@/widgets/storeTable";
import { FC } from "react";

const PageStores: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage
        title="Store"
        description="Manage your store list"
        action={<ToStoreCreateButton route={RoutePathEnum.STORE_CREATE} />}
      />
      <StoreTable />
    </main>
  );
};
export default PageStores;
