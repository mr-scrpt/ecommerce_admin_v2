import { FC, HTMLAttributes } from "react";
import { ProductId } from "../../_domain/types";
import { useProductListByIdQuery } from "../../_query/productListById.query";
import { Title } from "@/shared/ui/title";
import { ProductSnippet } from "./productSnippet";

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  productListId: Array<ProductId>;
}

export const ProductList: FC<ProductListProps> = (props) => {
  const { productListId } = props;
  const { isPending, isSuccess, data } = useProductListByIdQuery(productListId);
  return (
    <div className="flex w-full flex-col gap-4">
      <Title title="Product List" />
      {isPending && <div>Loading...</div>}

      {isSuccess &&
        data.map((item) => <ProductSnippet key={item.id} product={item} />)}
    </div>
  );
};
