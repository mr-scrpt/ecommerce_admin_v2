"use client";
// import { storage } from "@/shared/lib/storege";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import {
  ProductFromFrom,
  ProductPropertyObjectList,
  ProductPropertyToSelect,
  ProductRelation,
} from "../_domain/types";
import { ProductForm } from "./productForm";

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

// const tabActiveStorege = storage("tabActive");

export const ProductFormLayout: FC<ProductFormLayoutProps> = (props) => {
  const {
    propertySelectOptionList,
    submitText,
    categorySelectOptionList,
    categotySelectOptionListActive,
    handleCategorySelectOption,
  } = props;

  const onSelect = (value: string) => {
    // tabActiveStorege.setItem(value);
    localStorage.setItem("tabActive", value);
  };

  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    // const tabActive = tabActiveStorege.getItem();
    const tabActive = localStorage.getItem("tabActive");
    if (tabActive) {
      setActiveTab(tabActive);
    }
  }, []);

  return (
    <ProductForm {...props}>
      <div className="flex w-full flex-col gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex w-full justify-between">
            <TabsList>
              <TabsTrigger onClick={() => onSelect("general")} value="general">
                General
              </TabsTrigger>
              <TabsTrigger
                onClick={() => onSelect("property")}
                value="property"
              >
                Property
              </TabsTrigger>
            </TabsList>
            <ProductForm.SubmitButton
              className="align-self-end"
              submitText={submitText}
            />
          </div>
          <TabsContent value="general" className="flex w-full flex-col gap-4">
            <div className="flex w-full border p-4">
              <ProductForm.NameField />
            </div>
            <div className="flex w-full border p-4">
              <ProductForm.PriceField />
            </div>
            <div className="flex w-full border p-4">
              <ProductForm.DescriptionField />
            </div>
            <div className="flex w-full border p-4">
              <ProductForm.AboutField />
            </div>
            <div className="flex w-full border p-4">
              <ProductForm.ImgField />
            </div>
          </TabsContent>
          <TabsContent value="property" className="flex w-full flex-col gap-4">
            <div className="flex w-full border p-4">
              <ProductForm.CategoryListField
                categorySelectOptionList={categorySelectOptionList}
                categotySelectOptionListActive={categotySelectOptionListActive}
                handleCategorySelectOption={handleCategorySelectOption}
              />
            </div>
            {propertySelectOptionList &&
              propertySelectOptionList.map((property) => (
                <div key={property.id} className="flex w-full border p-4">
                  <ProductForm.PropertyField
                    option={property}
                    propertySelectOptionList={propertySelectOptionList}
                  />
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </ProductForm>
  );
};
