"use client";
import { OptionFromLayout, optionFormSchema } from "@/entities/option";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useOptionCreateMutation } from "../_mutation/optionCreate.mutation";

interface OptionCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type OptionFormValues = z.infer<typeof optionFormSchema>;

export const OptionFormCreate: FC<OptionCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const router = useRouter();

  const { optionCreate, isPending: isPendingUpdate } =
    useOptionCreateMutation();

  const handleSubmit = async (data: OptionFormValues) => {
    console.log("output_log: form data =>>>", data);
    await optionCreate({
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
      <OptionFromLayout
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Create option"}
      />
    </div>
  );
};
