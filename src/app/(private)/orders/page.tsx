import { TitlePage } from "@/shared/ui/titlePage";
import { OrderTable } from "@/widgets/orderTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageOrders: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Orders" description="Manage your order list" />
      <OrderTable />
    </main>
  );
};
export default PageOrders;
