"use client";
import {
  OptionFromLayout,
  OptionId,
  optionFormSchema,
  useOptionWithRelationQuery,
} from "@/entities/option";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useOptionUpdate } from "../_vm/useOptionUpdate";

interface OptionFormProps extends HTMLAttributes<HTMLDivElement> {
  optionId: OptionId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type OptionFormValues = z.infer<typeof optionFormSchema>;

export const OptionFormUpdate: FC<OptionFormProps> = (props) => {
  const { optionId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingOption,
    option,
    isFetchedAfterMount,
  } = useOptionWithRelationQuery(optionId);

  const router = useRouter();

  const { optionUpdate, isPending: isPendingUpdate } = useOptionUpdate();

  const isPendingComplexible =
    isPendingUpdate || isPendingOption || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!option) {
    return <div>Failed to load option, you may not have permissions</div>;
  }

  const handleSubmit = async (data: OptionFormValues) => {
    console.log("output_log: send =>>>", data);
    await optionUpdate({
      optionId: option.id,
      data: {
        ...data,
        id: option.id,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  return (
    <div className={cn(className, "w-full")}>
      <OptionFromLayout
        option={option}
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        submitText={"Save change"}
      />
    </div>
  );
};
