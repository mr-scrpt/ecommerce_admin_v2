"use client";
import { CategoryFormElements } from "@/entities/category";
import { ProductFormElements } from "@/entities/product";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes, memo } from "react";
import { productUpdateFormSchema } from "../../_domain/form.schema";
import { useProductUpdateHandler } from "../../_vm/useProductUpdate.handler";
import { useProductUpdateValues } from "../../_vm/useProductUpdateValues.model";
import { ProductUpdateFormElements } from "./productUpdateFormElements";
import { Spinner } from "@/shared/ui/icons/spinner";

interface ProductUpdateFormProps extends HTMLAttributes<HTMLDivElement> {
  productId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ProductUpdateForm: FC<ProductUpdateFormProps> = memo((props) => {
  const { productId, callbackUrl, className, onSuccess } = props;

  const {
    productUpdateValues,
    isPendingProductData,
    isFetchedAfterMountProductData,
  } = useProductUpdateValues({
    productId,
  });

  const { handleProductUpdate, isPendingUpdate, isSuccessUpdate } =
    useProductUpdateHandler({ data: { productId }, onSuccess, callbackUrl });

  // if (isPendingProductData || !isFetchedAfterMountProductData) {
  //   return <Spinner aria-label="Loading profile..." />;
  // }

  const isPending =
    isPendingProductData || !isFetchedAfterMountProductData || isPendingUpdate;

  return (
    <div className={cn(className, "w-full")}>
      <ProductFormElements
        handleSubmit={handleProductUpdate}
        schema={productUpdateFormSchema}
        defaultValues={productUpdateValues}
      >
        <CategoryFormElements.FieldCategoryMultiSelect />
        <ProductUpdateFormElements.FieldProductPropertySection />
        <ProductFormElements.FieldName />
        <ProductFormElements.FieldArticle />
        <ProductFormElements.FieldDescription />
        <ProductFormElements.FieldAbout />
        <ProductFormElements.FieldPrice />
        <ProductFormElements.FieldInStock />
        <ProductFormElements.FieldImgList />
        <ProductFormElements.SubmitButton
          isPending={isPending}
          submitText="Create Product"
        />
      </ProductFormElements>
    </div>
  );
});

ProductUpdateForm.displayName = "ProductFormUpdate";
