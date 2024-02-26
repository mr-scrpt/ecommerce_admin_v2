"use client";
import {
  ProductForm,
  ProductId,
  productFormSchema,
  useProductWithRelationQuery,
} from "@/entities/product";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { uniqBy } from "lodash-es";
import {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useOptionListTransform } from "@/shared/lib/map";
import {
  OptionSelect,
  useOptionListByCategoryIdList,
  useOptionListWithDataActive,
} from "@/entities/option";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { ProductFormOptions } from "@/entities/product/_ui/productFormOptions";
import { Button } from "@/shared/ui/button";
import { useCategoryDataToForm } from "../_vm/useProductFormUpdate";

interface ProductFormProps extends HTMLAttributes<HTMLDivElement> {
  productId: ProductId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductFormUpdate: FC<ProductFormProps> = memo((props) => {
  const { productId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingProduct,
    product,
    isFetchedAfterMount,
  } = useProductWithRelationQuery(productId);

  const { toDataIdList, toOptionList } = useOptionListTransform();

  const {
    categorySelectOptionList,
    categoryIdListSelected,
    isPendingCategoryOptionList,
    setCategoryIdListSelected,
    categoryIdListComputed,
  } = useCategoryDataToForm(product);
  console.log(
    "output_log: categoryIdListSelected =>>>",
    categoryIdListSelected,
  );
  console.log(
    "output_log: categoryIdListComputed =>>>",
    categoryIdListComputed,
  );

  const {
    optionList,
    setCategoryIdList,
    isPending: isPendingOptionList,
  } = useOptionListByCategoryIdList();

  const prevOptionList = useRef<OptionSelect[]>();
  const categotyIdListComputedRef = useRef(categoryIdListComputed);
  console.log("output_log:  =>>>", prevOptionList.current, optionList);
  console.log(
    "output_log: categotyIdListComputedRef =>>>",
    categotyIdListComputedRef.current,
    categoryIdListComputed,
  );
  useEffect(() => {
    // if (optionList && optionList !== prevOptionList.current) {
    // if (optionList && !optionList.length) {
    if (categotyIdListComputedRef.current !== categoryIdListComputed) {
      console.log("output_log: in useEffect =>>>", optionList);
      // setCategoryIdListSelected(toOptionList(categoryIdListComputed));
      setCategoryIdList(categoryIdListComputed.map((item) => item.value));
      prevOptionList.current = optionList;
    }
    // setCategoryIdList(categoryIdListComputed.map((item) => item.value));
  }, [categoryIdListComputed]);

  const router = useRouter();

  const { productUpdate, isPending: isPendingUpdate } =
    useProductUpdateMutation();

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingCategoryOptionList ||
    isPendingProduct ||
    isPendingOptionList ||
    !isFetchedAfterMount;

  const handleSelectedOption = useCallback(
    (optionListSelected: Array<MultiSelectOptionItem>) => {
      const categoryIdList = toDataIdList(optionListSelected);
      setCategoryIdListSelected(toOptionList(categoryIdList));
      setCategoryIdList(categoryIdList.map((item) => item.id));
      return categoryIdList;
    },
    [toDataIdList, toOptionList, setCategoryIdListSelected, setCategoryIdList],
  );

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!product) {
    return <div>Failed to load product, you may not have permissions</div>;
  }

  const handleSubmit = async (data: ProductFormValues) => {
    await productUpdate({
      productId: product.id,
      data: {
        ...data,
        id: product.id,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  console.log("output_log: optionList  =>>>", optionList);

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        product={product}
        categorySelectOptionList={categorySelectOptionList}
        // categotySelectOptionListActive={categotySelectOptionListActive}
        categotySelectOptionListActive={categoryIdListComputed}
        // categotySelectOptionListActive={res}
        handleCategorySelectOption={handleSelectedOption}
        // handleCategorySelectOption={() => []}
        optionSelectOptionList={optionList}
        // optionSelectOptionListActive={optionListWithDataActiveCompleted}
        submitText={"Save change"}
      />
      <Button onClick={() => console.log(optionList)}>Show state</Button>
      {/* <ProductFormOptions optionSelectOptionList={optionListWithDataActive} /> */}
    </div>
  );
});

ProductFormUpdate.displayName = "ProductFormUpdate";
// const { optionListWithDataActive } = useOptionListWithDataActive({
//   optionList,
//   optionItemListSelected: product?.optionItemListSelected ?? [],
// });

// console.log("output_log: product =>>>", product);
// console.log(
//   "output_log: optionListWithDataActive =>>>",
//   optionListWithDataActive,
// );

// const categotySelectOptionListActive = toOptionList(product.categoryList);
// const optionListWithDataActiveCompleted = Object.fromEntries(
//   optionListWithDataActive.map((item) => {
//     return [
//       item.name,
//       item.datatype === "mult"
//         ? item.optionList.map((option) => option.value)
//         : item.optionList[0].value,
//     ];
//   }),
// );
// console.log(
//   "output_log: optionListWithDataActiveCompleted =>>>",
//   optionListWithDataActiveCompleted,
// );
//
// console.log(
//   "output_log:  categotySelectOptionList =>>>",
//   categorySelectOptionList,
// );
// console.log(
//   "output_log:  categotySelectOptionListActive=>>>",
//   categotySelectOptionListActive,
// );
//
//
