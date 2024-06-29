import { Separator } from "@/shared/ui/separator";
import { FC, HTMLAttributes } from "react";
import { PropertyRelation } from "../_domain/property/property.types";
import { PropertyFormElements } from "./propertyFormElements";
import { PropertyFormValues } from "../_domain/property/form.schema";

interface PropertyFromLayoutProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "property"> {
  property?: PropertyRelation;
  handleSubmit: (data: PropertyFormValues) => void;
  isPending: boolean;
  submitText: string;
}

export const PropertyFromLayout: FC<PropertyFromLayoutProps> = (props) => {
  const { property, handleSubmit, submitText, isPending } = props;

  return (
    <PropertyFormElements
      isPending={isPending}
      property={property}
      submitText={submitText}
      handleSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex w-full">
        <PropertyFormElements.FieldProperty />
      </div>
      <Separator />
      <div className="flex w-full">
        <PropertyFormElements.FieldPropertysItem isPending={isPending} />
      </div>
      <div className="flex w-full">
        <PropertyFormElements.SubmitButton
          isPending={isPending}
          submitText={submitText}
        />
      </div>
    </PropertyFormElements>
  );
};
