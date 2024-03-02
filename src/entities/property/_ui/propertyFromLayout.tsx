import { Separator } from "@/shared/ui/separator";
import { FC, HTMLAttributes } from "react";
import { PropertyFormValues } from "../_domain/property/property.schema";
import { PropertyRelation } from "../_domain/property/types";
import { PropertyForm } from "./propertyForm";

interface PropertyFromLayoutProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "property"> {
  property?: PropertyRelation;
  handleSubmit?: (data: PropertyFormValues) => void;
  isPending: boolean;
  submitText: string;
}

export const PropertyFromLayout: FC<PropertyFromLayoutProps> = (props) => {
  const { property, handleSubmit, submitText, isPending } = props;

  return (
    <PropertyForm
      isPending={isPending}
      property={property}
      submitText={submitText}
      handleSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex w-full">
        <PropertyForm.FieldProperty />
      </div>
      <Separator />
      <div className="flex w-full">
        <PropertyForm.FieldPropertysItem isPending={isPending} />
      </div>
      <div className="flex w-full">
        <PropertyForm.SubmitButton
          isPending={isPending}
          submitText={submitText}
        />
      </div>
    </PropertyForm>
  );
};
