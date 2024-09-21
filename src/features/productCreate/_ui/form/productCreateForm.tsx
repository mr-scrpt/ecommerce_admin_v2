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

  const { handleProductCreate, isPendingCreate, isSuccessCreate } =
    useProductCreateHandler(onSuccess, callbackUrl);

  return (
    <div className={cn(className, "w-full")}>
      <ProductFormElements
        handleSubmit={handleProductCreate}
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
