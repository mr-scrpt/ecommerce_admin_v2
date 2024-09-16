import { useCategoryQuery } from "@/entities/category";
import { usePropertyListByCategoryQuery } from "@/entities/property";
import {
  CategoryUpdateFormValues,
  categoryUpdateDefaultFieldsValues,
} from "../_domain/form.schema";

interface CategoryDefaultValueProps {
  categoryId: string;
}

export const useCategoryDefaultValues = (props: CategoryDefaultValueProps) => {
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

  let defaultValues: CategoryUpdateFormValues = {
    ...categoryUpdateDefaultFieldsValues,
  };

  if (propertyList) {
    defaultValues.propertyList = propertyList.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }
  if (category) {
    defaultValues = {
      name: category.name,
      board: category.board,
      propertyList: propertyList.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }),
    };
  }

  const isPending = isPendingCategory || isPendingProperty;
  const isFetchedAfterMount =
    isFetchedAfterMountCategory && isFetchedAfterMountProperty;

  return { defaultValues, isPending, isFetchedAfterMount };
};
