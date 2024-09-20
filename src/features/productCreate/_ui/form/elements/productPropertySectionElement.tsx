import { FC, memo, HTMLAttributes } from "react";

import { usePropertyListByCategoryIdListModel } from "@/entities/property";
import { CategoryDefaultSelectOption } from "@/kernel/domain/category/form.schema";
import {
  PropertyDefaultSelectOption,
  PropertyItemDefaultSelectOption,
} from "@/kernel/domain/property/form.schema";
import { ProductPropertyDatatypeFieldList } from "../../../_vm/productPropertyDatatypeFieldList";
import { ProductPropertyCheckbox } from "./sections/productPropertyCheckbox";
import { ProductPropertySelect } from "./sections/productPropertySelect";
import { ProductPropertyMultiSelect } from "./sections/productPropertyMultiSelect";
import { ProductPropertyRadio } from "./sections/productPropertyRadio";

export interface ProductPropertySectionProps
  extends HTMLAttributes<HTMLDivElement> {
  propertyItemListActive?: Array<PropertyItemDefaultSelectOption>;
  categoryList: Array<CategoryDefaultSelectOption>;
  onSelectPropertyItem: (delivery: PropertyDefaultSelectOption) => void;
}

export const ProductPropertySectionElement: FC<ProductPropertySectionProps> =
  memo((props) => {
    const { categoryList } = props;

    const { propertyList } = usePropertyListByCategoryIdListModel(categoryList);

    const elementList = ProductPropertyDatatypeFieldList({
      Checkbox: ProductPropertyCheckbox,
      Select: ProductPropertySelect,
      Mult: ProductPropertyMultiSelect,
      Radio: ProductPropertyRadio,
    });

    return (
      <div className="flex flex-col space-y-1">
        {propertyList?.map((item) => {
          const propertyDatatypeComponent = elementList[item.datatype];

          const Element = propertyDatatypeComponent.formElement;
          return (
            <div
              className="flex w-full flex-col gap-2 border p-4"
              key={item.value}
            >
              <div className="flex w-full items-center space-x-3 space-y-0">
                <div className="font-normal">{item.label}</div>
              </div>
              {/* <Element propertyId={item.value} /> */}

              <Element
                propertyId={item.value}
                title={item.label}
                key={item.value}
              />
            </div>
          );
        })}
      </div>
    );
  });

ProductPropertySectionElement.displayName = "ProductPropertySectionElement";
