import { OrderId } from "@/entities/order";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { OrderUpdate } from "@/widgets/orderUpdate";
import { FC, HTMLAttributes, memo } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  params: { orderId: OrderId };
}

const OrderUpdatePage: FC<PageProps> = memo((props) => {
  const {
    params: { orderId },
  } = props;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Order update" description="Update order item" />
      <OrderUpdate callbackUrl={RoutePathEnum.ORDERS} orderId={orderId} />
    </main>
  );
});
OrderUpdatePage.displayName = "OrderUpdatePage";

export default OrderUpdatePage;
