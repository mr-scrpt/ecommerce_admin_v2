import { useProductWithRelationQuery } from "@/entities/product";
import { buildCategoryOptionsArray } from "@/kernel/domain/category/form.schema";
import {
  ProductUpdateFormValues,
  productUpdateFieldsValues,
} from "../_domain/form.schema";
import { buildPropertyItemOptionsArray } from "@/kernel/domain/property/form.schema";

interface ProductDefaultValueProps {
  productId: string;
}

export const useProductUpdateValues = (props: ProductDefaultValueProps) => {
  const { productId } = props;

  const {
    product,
    isPending: isPendingProductData,
    isFetchedAfterMount: isFetchedAfterMountProductData,
    isSuccess: isSuccessProductData,
  } = useProductWithRelationQuery({ id: productId });

  if (!product) {
    return {
      productUpdateValues: productUpdateFieldsValues,
      isPendingProductData,
      isFetchedAfterMountProductData,
    };
  }

  const productUpdateValues: ProductUpdateFormValues = {
    name: product.name,
    article: product.article,
    description: product.description,
    price: product.price,
    inStock: product.inStock,
    about: product.about,
    imgList: product.imgList,
    categoryList: buildCategoryOptionsArray(product.categoryList),
    propertyItemList: buildPropertyItemOptionsArray(product.propertyItemList),
  };

  return {
    productUpdateValues,
    isPendingProductData,
    isSuccessProductData,
    isFetchedAfterMountProductData,
  };
};
