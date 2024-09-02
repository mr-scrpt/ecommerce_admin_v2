import { PropertyRelation } from "@/entities/property";
import { Category } from "@/kernel/domain/category/category.type";
import { useOptionListTransform } from "@/shared/lib/map";
import { useMemo } from "react";

interface CategoryDefaultValueProps {
  category: Category | null;
  propertyList: Array<PropertyRelation>;
}

export const useCategoryDefaultValues = (props: CategoryDefaultValueProps) => {
  const { category, propertyList } = props;
  const { toOptionList } = useOptionListTransform();
  return useMemo(() => {
    if (!category) {
      return {
        name: "",
        board: [],
        propertyList: [],
      };
    }

    return {
      name: category.name,
      board: category.board,
      propertyList: toOptionList(propertyList ?? []),
    };
  }, [category, propertyList, toOptionList]);
};
