import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { ProductCreate } from "@/widgets/productCreate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const ProductCreatePage: FC<PageProps> = (props) => {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <TitlePage title="Categories create" />

      <ProductCreate callbackUrl={RoutePathEnum.PRODUCTS} />
    </main>
  );
};

export default ProductCreatePage;
