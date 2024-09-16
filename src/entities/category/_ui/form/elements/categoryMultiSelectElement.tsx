import { FC, memo } from "react";

import { CategoryDefaultSelectOption } from "@/kernel/domain/category/form.schema";
import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { HTMLAttributes } from "react";
import { useCategoryListToSelectModel } from "../../../_vm/useCategoryListToSelect.modle";

export interface CategoryMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  categoryListActive?: Array<CategoryDefaultSelectOption>;
  onSelectCategory: (categoryList: Array<CategoryDefaultSelectOption>) => void;
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
