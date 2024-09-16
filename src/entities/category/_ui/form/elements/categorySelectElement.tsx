import { FC, memo } from "react";

import { CategoryDefaultSelectOption } from "@/kernel/domain/category/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useCategoryListToSelectModel } from "../../../_vm/useCategoryListToSelect.modle";

export interface CategorySelectProps extends HTMLAttributes<HTMLDivElement> {
  categoryActive?: CategoryDefaultSelectOption;
  onSelectCategory: (categoryList: Array<CategoryDefaultSelectOption>) => void;
}

export const CategorySelectElement: FC<CategorySelectProps> = memo((props) => {
  const { categoryActive, onSelectCategory } = props;

  const { categoryListToSelect, isPending } = useCategoryListToSelectModel();

  const placeholder = isPending ? "Loading..." : "Select category";

  if (isPending) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionList={categoryListToSelect}
      optionActive={categoryActive}
      placeholder={placeholder}
      onSelect={onSelectCategory}
    />
  );
});

CategorySelectElement.displayName = "CategorySelectElement";
