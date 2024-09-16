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
import { PROPERTY_DATATYPE } from "@prisma/client";

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

  // TODO: DefaultValues move to hook and data from server
  const defaultValues: PropertyCreateFormValues = useMemo(() => {
    return {
      name: "",
      datatypeList: [
        {
          label: PROPERTY_DATATYPE.SELECT,
          value: PROPERTY_DATATYPE.SELECT,
          type: PROPERTY_DATATYPE.SELECT,
        },
      ],
      propertyItemList: [{ label: "", value: "" }],
    };
  }, []);

  const handleSubmit = async (data: PropertyCreateFormValues) => {
    const { name, datatypeList, propertyItemList } = data;
    const [datatype] = datatypeList;

    await propertyCreate({
      propertyData: {
        name,
        datatype: datatype.type,
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
