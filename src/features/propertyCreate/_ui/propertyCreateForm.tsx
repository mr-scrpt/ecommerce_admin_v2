"use client";
import { PropertyFromLayout, propertyFormSchema } from "@/entities/property";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { usePropertyCreateMutation } from "../_mutation/propertyCreate.mutation";

interface PropertyCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export const PropertyFormCreate: FC<PropertyCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { propertyCreate, isPending: isPendingUpdate } =
    usePropertyCreateMutation();

  const handleSubmit = async (data: PropertyFormValues) => {
    console.log("output_log: form data =>>>", data);
    await propertyCreate({
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const isPendingComplexible = isPendingUpdate;

  return (
    <div className={cn(className, "w-full")}>
      <PropertyFromLayout
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create property"}
      />
    </div>
  );
};
