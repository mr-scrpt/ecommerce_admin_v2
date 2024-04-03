import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { OrderCreate } from "@/widgets/orderCreate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const OrderCreatePage: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Order create" description="Create order item" />

      <OrderCreate callbackUrl={RoutePathEnum.ORDERS} />
    </main>
  );
};

export default OrderCreatePage;
