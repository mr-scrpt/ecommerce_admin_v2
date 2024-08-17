import { FC, memo } from "react";

import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { HTMLAttributes } from "react";
import { SelectOptionItem } from "@/shared/type/select";
import { useCategoryListToSelectModel } from "../../../_vm/useCategoryListToSelect.modle";

export interface CategoryMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  categoryListActive?: Array<SelectOptionItem>;
  onSelectCategory: (categoryList: Array<SelectOptionItem>) => void;
}

export const CategoryMultiSelectElement: FC<CategoryMultiSelectProps> = memo(
  (props) => {
    const { categoryListActive, onSelectCategory } = props;

    const { categoryListToSelect: categorySelectOptionList } =
      useCategoryListToSelectModel();

    return (
      <MultiSelectElement
        optionList={categorySelectOptionList}
        optionActiveList={categoryListActive}
        onSelect={onSelectCategory}
      />
    );
  },
);

CategoryMultiSelectElement.displayName = "CategoryMultiSelectElement";
