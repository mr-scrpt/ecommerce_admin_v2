"use client";
import { FC, HTMLAttributes } from "react";
import {
  ProductFromFrom,
  ProductPropertyObjectList,
  ProductPropertyToSelect,
  ProductRelation,
} from "../_domain/types";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { ProductFormTest } from "./formT";
import { generateProductFormSchema } from "../_lib/generateDynamicSchema";

interface ProductFormLayoutProps extends HTMLAttributes<HTMLFormElement> {
  product?: ProductRelation;
  handleSubmit?: (data: ProductFromFrom) => void;
  isPending: boolean;
  submitText: string;
  categorySelectOptionList: Array<MultiSelectOptionItem>;
  categotySelectOptionListActive?: Array<MultiSelectOptionItem>;
  propertySelectOptionList: Array<ProductPropertyToSelect>;
  propertySelectObjectActive?: ProductPropertyObjectList;
  handleCategorySelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string; name: string }>;
}

export const ProductFormLayout: FC<ProductFormLayoutProps> = (props) => {
  const {
    product,
    propertySelectOptionList,
    propertySelectObjectActive,
    isPending,
    submitText,
    categorySelectOptionList,
    categotySelectOptionListActive,
    handleCategorySelectOption,
  } = props;

  return (
    <ProductFormTest {...props}>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full border p-4">
          <ProductFormTest.CategoryListField
            categorySelectOptionList={categorySelectOptionList}
            categotySelectOptionListActive={categotySelectOptionListActive}
            // propertySelectOptionList={propertySelectOptionList}
            handleCategorySelectOption={handleCategorySelectOption}
          />
        </div>
        {propertySelectOptionList &&
          propertySelectOptionList.map((property) => (
            <div key={property.id} className="flex w-full border p-4">
              <ProductFormTest.PropertyField
                option={property}
                propertySelectOptionList={propertySelectOptionList}
              />
            </div>
          ))}
        <div className="flex w-full border p-4">
          <ProductFormTest.NameField />
        </div>
        <div className="flex w-full border p-4">
          <ProductFormTest.DescriptionField />
        </div>
        <div className="flex w-full border p-4">
          <ProductFormTest.AboutField />
        </div>
        <div className="flex w-full border p-4">
          <ProductFormTest.ImgField />
        </div>
        <ProductFormTest.SubmitButton
          isPending={isPending}
          submitText={submitText}
        />
      </div>
    </ProductFormTest>
  );
};
