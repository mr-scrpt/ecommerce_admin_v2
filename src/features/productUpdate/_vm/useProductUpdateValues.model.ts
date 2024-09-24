import { useProductWithRelationQuery } from "@/entities/product";
// import { usePropertyListByProductQuery } from "@/entities/property";
import { productDefaultFieldsValues } from "@/entities/product/_domain/form.schema";
import {
  ProductUpdateFormValues,
  productUpdateFieldsValues,
} from "../_domain/form.schema";

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
    categoryList: product.categoryList.map((category) => ({
      value: category.id,
      label: category.name,
    })),
    propertyItemList: product.propertyItemList.map((item) => ({
      value: item.id,
      label: item.name,
      propertyId: item.propertyId,
    })),
  };

  return {
    productUpdateValues,
    isPendingProductData,
    isSuccessProductData,
    isFetchedAfterMountProductData,
  };
};
