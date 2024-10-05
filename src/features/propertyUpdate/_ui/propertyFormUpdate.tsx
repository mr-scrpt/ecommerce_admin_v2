"use client";
import {
  PropertyFormElements,
  PropertyItemFormElements,
  usePropertyItemListByPropertyQuery,
  usePropertyQuery,
} from "@/entities/property";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  PropertyUpdateFormValues,
  propertyUpdateFormSchema,
} from "../_domain/form.schema";
import { usePropertyUpdateHandler } from "../_vm/usePropertyUpdate.handler";
import { usePropertyUpdateValues } from "../_vm/usePropertyUpdateValues.model";

interface PropertyFormProps extends HTMLAttributes<HTMLDivElement> {
  propertyId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const PropertyFormUpdate: FC<PropertyFormProps> = (props) => {
  const { propertyId, callbackUrl, className, onSuccess } = props;

  const { handlePropertyUpdate, isPendingUpdate, isSuccessUpdate } =
    usePropertyUpdateHandler({
      data: { propertyId },
      onSuccess,
      callbackUrl,
    });

  const { propertyUpdateValues, isSuccess, isPending, isFetchedAfterMount } =
    usePropertyUpdateValues(propertyId);

  if (isPending || !isFetchedAfterMount) {
    return <Spinner aria-label="Loading profile..." />;
  }

  return (
    <div className={cn(className, "w-full")}>
      <PropertyFormElements<PropertyUpdateFormValues>
        defaultValues={propertyUpdateValues}
        handleSubmit={handlePropertyUpdate}
        schema={propertyUpdateFormSchema}
      >
        <PropertyFormElements.FieldName />
        <PropertyFormElements.FieldDataType />
        <PropertyItemFormElements.FieldPropertyItemList />
        <PropertyFormElements.SubmitButton
          isPending={isPendingUpdate}
          submitText="Update property"
        />
      </PropertyFormElements>
    </div>
  );
};
