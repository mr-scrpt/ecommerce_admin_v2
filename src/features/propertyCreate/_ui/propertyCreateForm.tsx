"use client";
import {
  PropertyFormElements,
  PropertyItemFormElements,
} from "@/entities/property";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useMemo } from "react";
import {
  PropertyCreateFormValues,
  propertyCreateFormSchema,
} from "../_domain/form.schema";
import { usePropertyCreateMutation } from "../_mutation/propertyCreate.mutation";
import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";

interface PropertyCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const PropertyFormCreate: FC<PropertyCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { propertyCreate, isPending: isPendingUpdate } =
    usePropertyCreateMutation();

  const defaultValues: PropertyCreateFormValues = useMemo(() => {
    return {
      name: "",
      datatype: [
        {
          label: PropertyDataTypeEnum.SELECT,
          value: PropertyDataTypeEnum.SELECT,
        },
      ],
      propertyItemList: [{ label: "", value: "" }],
    };
  }, []);

  const handleSubmit = async (data: PropertyCreateFormValues) => {
    const { name, datatype, propertyItemList } = data;
    await propertyCreate({
      propertyData: {
        name,
        datatype: datatype[0].value,
      },
      propertyItemData: propertyItemList.map(({ value, label }) => ({
        name: label,
        value: value,
      })),
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const isPendingComplexible = isPendingUpdate;

  return (
    <div className={cn(className, "w-full")}>
      <PropertyFormElements<PropertyCreateFormValues>
        handleSubmit={handleSubmit}
        schema={propertyCreateFormSchema}
        defaultValues={defaultValues}
      >
        <PropertyFormElements.FieldName />
        <PropertyFormElements.FieldDataType />
        <PropertyItemFormElements.FieldPropertyItemList />
        <PropertyFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Create property"
        />
      </PropertyFormElements>
      {/* <PropertyFromLayout */}
      {/*   handleSubmit={handleSubmit} */}
      {/*   isPending={isPendingComplexible} */}
      {/*   submitText={"Create property"} */}
      {/* /> */}
    </div>
  );
};
