import { useCategoryQuery } from "@/entities/category";
import { usePropertyListByCategoryQuery } from "@/entities/property";
import {
  CategoryUpdateFormValues,
  categoryUpdateFieldsValues,
} from "../_domain/form.schema";

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

  let categoryUpdateValues: CategoryUpdateFormValues = {
    ...categoryUpdateFieldsValues,
  };

  // if (propertyList) {
  //   defaultValues.propertyList = propertyList.map((item) => {
  //     return {
  //       value: item.id,
  //       label: item.name,
  //       datatype: item.datatype,
  //     };
  //   });
  // }

  if (category && propertyList) {
    categoryUpdateValues = {
      name: category.name,
      board: category.board,
      propertyList: propertyList.map((item) => {
        return {
          value: item.id,
          label: item.name,
          datatype: item.datatype,
        };
      }),
    };
  }

  const isPending = isPendingCategory || isPendingProperty;
  const isFetchedAfterMount =
    isFetchedAfterMountCategory && isFetchedAfterMountProperty;

  return { categoryUpdateValues, isPending, isFetchedAfterMount };
};
