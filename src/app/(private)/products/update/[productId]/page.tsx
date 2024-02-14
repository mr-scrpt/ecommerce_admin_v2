import { ProductId } from "@/entities/product";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { ProductUpdate } from "@/widgets/productUpdate";
import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  params: { productId: ProductId };
}

const ProductUpdatePage: FC<PageProps> = (props) => {
  const {
    params: { productId },
  } = props;
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <TitlePage title="Categories update" />
      <ProductUpdate
        callbackUrl={RoutePathEnum.CATEGORIES}
        productId={productId}
      />
    </main>
  );
};

export default ProductUpdatePage;
