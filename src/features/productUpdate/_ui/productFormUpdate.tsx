"use client";
import {
  ProductForm,
  ProductId,
  productFormSchema,
  useProductBySlugQuery,
  useProductQuery,
} from "@/entities/product";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useProductUpdate } from "../_vm/useProductUpdate";

interface ProductFormProps extends HTMLAttributes<HTMLDivElement> {
  productId: ProductId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductFormUpdate: FC<ProductFormProps> = (props) => {
  const { productId, callbackUrl, className, onSuccess } = props;

  const { isPending, product } = useProductQuery(productId);
  const router = useRouter();

  const { productUpdate, isPending: isPendingUpdate } = useProductUpdate();

  if (isPending) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!product) {
    return <div>Failed to load product, you may not have permissions</div>;
  }

  const handleSubmit = async (data: ProductFormValues) => {
    await productUpdate({
      productId: product.id,
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPending || isPendingUpdate}
        product={product}
        submitText={"Save change"}
      />
    </div>
  );
};
