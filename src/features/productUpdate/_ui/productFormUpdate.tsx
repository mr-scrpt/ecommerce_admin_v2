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
  useState,
} from "react";
import { z } from "zod";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useOptionListTransform } from "@/shared/lib/map";
import {
  useOptionListByCategoryIdList,
  useOptionListWithDataActive,
} from "@/entities/option";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { ProductFormOptions } from "@/entities/product/_ui/productFormOptions";
import { Button } from "@/shared/ui/button";

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

  const {
    optionList,
    setCategoryIdList,
    isPending: isPendingOptionList,
  } = useOptionListByCategoryIdList();

  useEffect(() => {
    if (product) {
      // console.log("output_log: product =>>>", product.categoryList);
      setCategoryIdList(product.categoryList.map((item) => item.id));
    }
  }, [product, setCategoryIdList]);

  // console.log("output_log:  optionList =>>>", optionList);

  // const { optionListWithDataActive } = useOptionListWithDataActive({
  //   optionList,
  //   optionItemListSelected: product?.optionItemListSelected ?? [],
  // });

  // console.log("output_log: product =>>>", product);
  // console.log(
  //   "output_log: optionListWithDataActive =>>>",
  //   optionListWithDataActive,
  // );

  const router = useRouter();

  const { productUpdate, isPending: isPendingUpdate } =
    useProductUpdateMutation();

  const { categorySelectOptionList, isPending: isPendingCategoryOptionList } =
    useCategoryLikeSelectOptionList();

  const { toDataIdList, toOptionList } = useOptionListTransform();

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingCategoryOptionList ||
    isPendingProduct ||
    isPendingOptionList ||
    !isFetchedAfterMount;
  const [categoryIdListState, setCategoryIdListState] = useState<string[]>([]);

  const handleSelectedOption = useCallback(
    (optionListSelected: Array<MultiSelectOptionItem>) => {
      // console.log("output_log: optionListSelected =>>>", optionListSelected);
      const categoryIdList = toDataIdList(optionListSelected);
      // setCategoryIdListState(optionListSelected);
      // setCategoryIdList(categoryIdList.map((item) => item.id));
      // console.log("output_log: categoryIdList =>>>", categoryIdList);
      setCategoryIdListState(categoryIdList.map((item) => item.id));
      return categoryIdList;
    },
    [toDataIdList],
  );

  useEffect(() => {
    // console.log("output_log: setCategoryIdListState =>>>", categoryIdListState);
    setCategoryIdList(categoryIdListState);
  }, [categoryIdListState, setCategoryIdList]);

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
  const active = categorySelectOptionList.filter((item) =>
    categoryIdListState.includes(item.value),
  );
  // console.log("output_log:  active=>>>", active);

  const res = uniqBy(
    [...toOptionList(product.categoryList), ...active],
    "value",
  );
  // console.log("output_log: res =>>>", res);
  console.log("output_log: LIST =>>>", optionList);

  return (
    <div className={cn(className, "w-full")}>
      <ProductForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        product={product}
        categorySelectOptionList={categorySelectOptionList}
        // categotySelectOptionListActive={categotySelectOptionListActive}
        categotySelectOptionListActive={res}
        handleCategorySelectOption={handleSelectedOption}
        // handleCategorySelectOption={() => []}
        // optionSelectOptionList={optionList}
        // optionSelectOptionListActive={optionListWithDataActiveCompleted}
        submitText={"Save change"}
      />
      <Button onClick={() => console.log(optionList)}>Show state</Button>
      {/* <ProductFormOptions optionSelectOptionList={optionListWithDataActive} /> */}
    </div>
  );
});

ProductFormUpdate.displayName = "ProductFormUpdate";

// [
//     {
//         "id": "option_585fsddfew7898dd",
//         "name": "Size",
//         "datatype": "select",
//         "optionList": [
//             {
//                 "value": "optionItem_M68ddtwaew65687M",
//                 "label": "M"
//             },
//             {
//                 "value": "optionItem_L58ddtwaew65622L",
//                 "label": "L"
//             }
//         ]
//     },
//       {
//         "id": "option_585fsddfew7898dd",
//         "name": "Color",
//         "datatype": "mult",
//         "optionList": [
//             {
//                 "value": "optionItem_dddwaew65687Red",
//                 "label": "Red"
//             },
//         ]
//     }
//
// ]
//
// {
//   Size: ["optionItem_M68ddtwaew65687M", "optionItem_L58ddtwaew65622L"];
//   Color: "optionItem_dddwaew65687Red"
// }
