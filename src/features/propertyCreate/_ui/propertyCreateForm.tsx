"use client";
import {
  PropertyFormElements,
  PropertyItemFormElements,
} from "@/entities/property";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import {
  PropertyCreateFormValues,
  propertyCreateFormSchema,
} from "../_domain/form.schema";
import { usePropertyCreateMutation } from "../_mutation/propertyCreate.mutation";
import { usePropertyCreateHandler } from "../_vm/usePropertyCreate.handler";

interface PropertyCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const PropertyFormCreate: FC<PropertyCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const { handlePropertyCreate, isPendingCreate } = usePropertyCreateHandler({
    callbackUrl,
    onSuccess,
  });

  return (
    <div className={cn(className, "w-full")}>
      <PropertyFormElements<PropertyCreateFormValues>
        handleSubmit={handlePropertyCreate}
        schema={propertyCreateFormSchema}
      >
        <PropertyFormElements.FieldName />
        <PropertyFormElements.FieldDataType />
        <PropertyItemFormElements.FieldPropertyItemList />
        <PropertyFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText="Create property"
        />
      </PropertyFormElements>
    </div>
  );
};
