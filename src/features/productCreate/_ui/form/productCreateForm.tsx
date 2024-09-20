"use client";
import { CategoryFormElements } from "@/entities/category";
import { ProductFormElements } from "@/entities/product";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  productCreateFieldsValues,
  productCreateFormSchema,
} from "../../_domain/form.schema";
import { useProductCreateHandler } from "../../_vm/useProductCreate.handler";
import { ProductCreateFormElements } from "./productCreateFormElements";

interface ProductCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ProductCreateForm: FC<ProductCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const { createProductHandler, isPendingCreate, isSuccessCreate } =
    useProductCreateHandler(onSuccess, callbackUrl);

  return (
    <div className={cn(className, "w-full")}>
      <ProductFormElements
        handleSubmit={createProductHandler}
        schema={productCreateFormSchema}
        defaultValues={productCreateFieldsValues}
      >
        <CategoryFormElements.FieldCategoryMultiSelect />
        <ProductCreateFormElements.FieldProductPropertySection />
        <ProductFormElements.FieldName />
        <ProductFormElements.FieldArticle />
        <ProductFormElements.FieldDescription />
        <ProductFormElements.FieldAbout />
        <ProductFormElements.FieldPrice />
        <ProductFormElements.FieldInStock />
        <ProductFormElements.FieldImgList />
        <ProductFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText="Create Product"
        />
      </ProductFormElements>
    </div>
  );
};
// const {
//   categoryOptionListTotal,
//   categoryOptionListActive,
//   isPendingCategoryOptionList,
//   setCategoryOptionListSelected,
// } = useCategoryDataToFormModel();
// // TODO: What is the type?
// const handleSubmit = async (data: ProductFromForm) => {
//   const { categoryList, propertyItemListSelected, ...productData } = data;
//
//   await productCreate({
//     productData,
//     propertyItemData: propertyItemListSelected.map(({ id }) => ({
//       propertyItemId: id,
//     })),
//     categoryData: categoryList.map(({ id }) => ({ categoryId: id })),
//   });
//
//   onSuccess?.();
//
//   if (callbackUrl) {
//     router.push(callbackUrl);
//   }
// };
// const {
//   propertyList,
//   setCategoryIdList,
//   isPending: isPendingPropertyList,
// } = usePropertyListByCategoryIdListModel(categoryOptionListActive, []);
// const { toDataIdList, toOptionList } = useOptionListTransform();
//
// const handleSelectedProperty = useCallback(
//   (propertyListSelected: Array<ProductDefaultSelectOption>) => {
//     const categoryIdList = toDataIdList(propertyListSelected);
//     setCategoryOptionListSelected(toOptionList([]));
//     setCategoryOptionListSelected(toOptionList(categoryIdList));
//     setCategoryIdList(categoryIdList.map((item) => item.id));
//     return categoryIdList;
//   },
//   [
//     toDataIdList,
//     toOptionList,
//     setCategoryOptionListSelected,
//     setCategoryIdList,
//   ],
// );
