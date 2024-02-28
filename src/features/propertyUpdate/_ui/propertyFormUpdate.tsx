"use client";
import {
  PropertyFromLayout,
  PropertyId,
  propertyFormSchema,
  usePropertyWithRelationQuery,
} from "@/entities/property";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { usePropertyUpdateMutation } from "../_mutation/usePropertyUpdate.mutation";

interface PropertyFormProps extends HTMLAttributes<HTMLDivElement> {
  propertyId: PropertyId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export const PropertyFormUpdate: FC<PropertyFormProps> = (props) => {
  const { propertyId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingProperty,
    property,
    isFetchedAfterMount,
  } = usePropertyWithRelationQuery(propertyId);

  const router = useRouter();

  const { propertyUpdate, isPending: isPendingUpdate } =
    usePropertyUpdateMutation();

  const isPendingComplexible =
    isPendingUpdate || isPendingProperty || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!property) {
    return <div>Failed to load property, you may not have permissions</div>;
  }

  const handleSubmit = async (data: PropertyFormValues) => {
    console.log("output_log: send =>>>", data);
    await propertyUpdate({
      propertyId: property.id,
      data: {
        ...data,
        id: property.id,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  return (
    <div className={cn(className, "w-full")}>
      <PropertyFromLayout
        property={property}
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Save change"}
      />
    </div>
  );
};
