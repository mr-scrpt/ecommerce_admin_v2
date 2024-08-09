import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { ProductCreate } from "@/widgets/productCreate";
import { FC } from "react";

const ProductCreatePage: FC = () => {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Product create" description="Create product item" />

      <ProductCreate callbackUrl={RoutePathEnum.PRODUCTS} />
    </main>
  );
};

export default ProductCreatePage;
