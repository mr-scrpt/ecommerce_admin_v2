import { FC, HTMLAttributes } from "react";

import { SelectOptionItem } from "@/shared/type/select";
import { Spinner } from "@/shared/ui/icons/spinner";
import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { useProductListToSelectModel } from "../../../_vm/useProductListToSelect.model";

export interface ProductMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  productListActive?: Array<SelectOptionItem>;
  onSelectProduct: (productList: Array<SelectOptionItem>) => void;
}
export const ProductMultiSelectElement: FC<ProductMultiSelectProps> = (
  props,
) => {
  const { productListActive, onSelectProduct } = props;

  const { productListToSelect, isPending, isSuccess, isFetchedAfterMount } =
    useProductListToSelectModel();

  if (!isFetchedAfterMount || isPending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <MultiSelectElement
      optionList={productListToSelect}
      optionActiveList={productListActive}
      onSelect={onSelectProduct}
    />
  );
};
