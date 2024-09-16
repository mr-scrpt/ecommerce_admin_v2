import { FC, HTMLAttributes } from "react";

import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { useProductListToSelectModel } from "../../../_vm/useProductListToSelect.model";

export interface ProductSelectProps extends HTMLAttributes<HTMLDivElement> {
  productActive?: ProductDefaultSelectOption;
  onSelectProduct: (productList: Array<ProductDefaultSelectOption>) => void;
}
export const ProductSelectElement: FC<ProductSelectProps> = (props) => {
  const { productActive, onSelectProduct } = props;

  const { productListToSelect, isPending, isSuccess, isFetchedAfterMount } =
    useProductListToSelectModel();

  const placeholder = isPending ? "Loading..." : "Select product";

  if (!isFetchedAfterMount || isPending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionActive={productActive}
      onSelect={onSelectProduct}
      optionList={productListToSelect}
      placeholder={placeholder}
    />
  );
};
