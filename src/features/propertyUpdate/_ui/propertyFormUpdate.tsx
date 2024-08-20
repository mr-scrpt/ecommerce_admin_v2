"use client";
import {
  PropertyFormElements,
  PropertyItemFormElements,
  usePropertyItemListByPropertyQuery,
  usePropertyQuery,
} from "@/entities/property";
import { useOptionListTransform } from "@/shared/lib/map";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import {
  PropertyUpdateFormValues,
  propertyUpdateFormSchema,
} from "../_domain/form.schema";
import { usePropertyUpdateMutation } from "../_mutation/usePropertyUpdate.mutation";

interface PropertyFormProps extends HTMLAttributes<HTMLDivElement> {
  propertyId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const PropertyFormUpdate: FC<PropertyFormProps> = (props) => {
  const { propertyId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingProperty,
    property,
    isFetchedAfterMount: isFetchedAfterMountProperty,
  } = usePropertyQuery(propertyId);

  const {
    propertyItemList,
    isPending: isPendingPropertyItem,
    isFetchedAfterMount: isFetchedAfterMountPropertyItem,
  } = usePropertyItemListByPropertyQuery(propertyId);

  console.log("output_log: propertyItemList =>>>", propertyItemList);
  const router = useRouter();

  const { propertyUpdate, isPending: isPendingUpdate } =
    usePropertyUpdateMutation();

  const { toOptionList } = useOptionListTransform();

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingProperty ||
    isPendingPropertyItem ||
    !isFetchedAfterMountProperty ||
    !isFetchedAfterMountPropertyItem;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!property) {
    return <div>Failed to load property, you may not have permissions</div>;
  }

  const defaultValues: PropertyUpdateFormValues = {
    name: property?.name,
    datatype: [{ label: property?.datatype, value: property?.datatype }],
    propertyItemList: propertyItemList.map((item) => ({
      value: item.value,
      label: item.name,
      id: item.id,
    })),
  };

  const handleSubmit = async (data: PropertyUpdateFormValues) => {
    console.log("output_log: form data =>>>", data);
    const { name, datatype, propertyItemList } = data;
    await propertyUpdate({
      selector: { id: property.id },
      propertyData: {
        name,
        datatype: datatype[0].value,
      },
      propertyItemListData: propertyItemList.map((item) => ({
        propertyId: property.id,
        name: item.label,
        value: item.value,
        id: item.id,
      })),
    });

    onSuccess?.();

    // if (callbackUrl) {
    //   router.push(callbackUrl);
    // }
  };
  return (
    <div className={cn(className, "w-full")}>
      <PropertyFormElements<PropertyUpdateFormValues>
        defaultValues={defaultValues}
        handleSubmit={handleSubmit}
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
