"use client";
import {
  OptionForm,
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
import {
  useCategoryLikeOptionList,
  useCategoryListTransformOption,
} from "@/entities/category";

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

  const { categoryOptionList, isPending: isPendingCategoryOptionList } =
    useCategoryLikeOptionList();
  const { toCategoryIdList, toOptionList } = useCategoryListTransformOption();

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingCategoryOptionList ||
    isPendingOption ||
    !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!option) {
    return <div>Failed to load option, you may not have permissions</div>;
  }

  const handleSubmit = async (data: OptionFormValues) => {
    await optionUpdate({
      optionId: option.id,
      data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  return (
    <div className={cn(className, "w-full")}>
      <OptionForm
        handleSubmit={handleSubmit}
        isPending={isPendingComplexible}
        option={option}
        submitText={"Save change"}
        // categoryOptionList={categoryOptionList}
        // handleCategoryOptionSelect={toCategoryIdList}
        // handleCategoryOptionActive={toOptionList}
      />
    </div>
  );
};
