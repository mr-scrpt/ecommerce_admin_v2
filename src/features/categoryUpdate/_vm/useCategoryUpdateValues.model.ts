import { useCategoryQuery } from "@/entities/category";
import {
  buildPropertyOptionsArray,
  usePropertyListByCategoryQuery,
} from "@/entities/property";
import { CategoryUpdateFormValues } from "../_domain/form.schema";

interface CategoryDefaultValueProps {
  categoryId: string;
}

export const useCategoryUpdateValues = (props: CategoryDefaultValueProps) => {
  const { categoryId } = props;

  const {
    category,
    isPending: isPendingCategory,
    isFetchedAfterMount: isFetchedAfterMountCategory,
  } = useCategoryQuery(categoryId);

  const {
    propertyList,
    isPending: isPendingProperty,
    isFetchedAfterMount: isFetchedAfterMountProperty,
  } = usePropertyListByCategoryQuery(categoryId);

  const categoryUpdateValues: CategoryUpdateFormValues = {
    name: category?.name || "",
    board: category?.board || [],
    propertyList: buildPropertyOptionsArray(propertyList),
  };

  const isPending = isPendingCategory || isPendingProperty;
  const isFetchedAfterMount =
    isFetchedAfterMountCategory && isFetchedAfterMountProperty;

  return { categoryUpdateValues, isPending, isFetchedAfterMount };
};
