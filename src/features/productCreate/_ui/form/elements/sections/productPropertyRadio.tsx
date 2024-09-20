import { PropertyItemFormElements } from "@/entities/property";
import { FC, HTMLAttributes } from "react";

interface ProductPropertyRadioProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  propertyId: string;
}

export const ProductPropertyRadio: FC<ProductPropertyRadioProps> = (props) => {
  const { title, propertyId } = props;
  return (
    <div className="flex flex-row gap-4">
      {title}: RADIO
      <PropertyItemFormElements.FieldPropertyItemRadio
        propertyId={propertyId}
      />
    </div>
  );
};
