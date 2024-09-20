import { PropertyItemFormElements } from "@/entities/property";
import { FC, HTMLAttributes } from "react";

interface ProductPropertyMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  propertyId: string;
}

export const ProductPropertyMultiSelect: FC<ProductPropertyMultiSelectProps> = (
  props,
) => {
  const { title, propertyId } = props;
  return (
    <div className="flex flex-row gap-4">
      {title}: MULTISELECT
      <PropertyItemFormElements.FieldPropertyItemMultiSelect
        propertyId={propertyId}
      />
    </div>
  );
};
