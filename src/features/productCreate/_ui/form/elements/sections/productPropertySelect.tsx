import { PropertyItemFormElements } from "@/entities/property";
import { FC, HTMLAttributes } from "react";

interface ProductPropertySelectProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  propertyId: string;
}

export const ProductPropertySelect: FC<ProductPropertySelectProps> = (
  props,
) => {
  const { title, propertyId } = props;
  return (
    <div className="flex flex-row gap-4">
      {title}: SELECT
      <PropertyItemFormElements.FieldPropertyItemSelect
        propertyId={propertyId}
      />
    </div>
  );
};
