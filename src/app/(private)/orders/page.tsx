import { ToOrderCreateButton } from "@/features/orderCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { OrderTable } from "@/widgets/orderTable";
import { FC } from "react";

const PageOrders: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage
        title="Orders"
        description="Manage your order list"
        action={<ToOrderCreateButton route={RoutePathEnum.ORDER_CREATE} />}
      />
      <OrderTable />
    </main>
  );
};
export default PageOrders;
