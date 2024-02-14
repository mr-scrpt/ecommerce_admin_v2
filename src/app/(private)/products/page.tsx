import { ProductCreateButton } from "@/features/productCreate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { ProductTable } from "@/widgets/productTable";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const PageCategories: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <TitlePage
        title="Categories"
        action={<ProductCreateButton route={RoutePathEnum.PRODUCT_CREATE} />}
      />
      <ProductTable />
    </main>
  );
};
export default PageCategories;
