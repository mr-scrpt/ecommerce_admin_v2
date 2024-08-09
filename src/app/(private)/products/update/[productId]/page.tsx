import { RoutePathEnum } from "@/shared/config/routing.config";
import { TitlePage } from "@/shared/ui/titlePage";
import { ProductUpdate } from "@/widgets/productUpdate";
import { FC, memo } from "react";

interface PageProps {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductUpdatePage: FC<PageProps> = memo((props) => {
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
});
ProductUpdatePage.displayName = "ProductUpdatePage";

export default ProductUpdatePage;
