import { FC, HTMLAttributes } from "react";

interface ProductPropertyRadioProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  propertyId: string;
  Component: FC<{ title: string; propertyId: string }>;
}

export const ProductPropertyRadio: FC<ProductPropertyRadioProps> = (props) => {
  const { title, propertyId, Component } = props;
  return (
    <div className="flex flex-row gap-4">
      <Component title={title} propertyId={propertyId} />
    </div>
  );
};
