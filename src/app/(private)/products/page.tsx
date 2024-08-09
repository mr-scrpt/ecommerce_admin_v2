import { ToProductCreateButton } from "@/features/productCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { ProductTable } from "@/widgets/productTable";
import { FC } from "react";

const PageCategories: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage
        title="Products"
        description="Manage your product list"
        action={<ToProductCreateButton route={RoutePathEnum.PRODUCT_CREATE} />}
      />
      <ProductTable />
    </main>
  );
};
export default PageCategories;
