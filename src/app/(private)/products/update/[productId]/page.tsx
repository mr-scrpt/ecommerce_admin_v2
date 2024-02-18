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
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <TitlePage title="Product update" description="Update product item" />
      <ProductUpdate
        callbackUrl={RoutePathEnum.PRODUCTS}
        productId={productId}
      />
    </main>
  );
};

export default ProductUpdatePage;
