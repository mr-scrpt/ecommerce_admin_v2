import { PropertyItemFormElements } from "@/entities/property";
import { PropertyItemFormDefaultValues } from "@/entities/property/_domain/propertyItem/form.schema";
import { FC, HTMLAttributes } from "react";
import { Control } from "react-hook-form";

interface ProductPropertyCheckboxProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  propertyId: string;
  control: Control<PropertyItemFormDefaultValues, any>;
}

export const ProductPropertyCheckbox: FC<ProductPropertyCheckboxProps> = (
  props,
) => {
  const { title, propertyId, control } = props;

  return (
    <div className="flex flex-row gap-4">
      {title}: CHECKBOX
      <PropertyItemFormElements.FieldPropertyItemCheckbox
        propertyId={propertyId}
      />
    </div>
  );
};
