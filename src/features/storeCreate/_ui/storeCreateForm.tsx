"use client";
import {
  SettlementFormElements,
  useSettlemetListToSelect,
} from "@/entities/settlement";
import { StoreFormDefaultValues, StoreFormElements } from "@/entities/store";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useStoreCreateMutation } from "../_mutation/useStoreCreate.mutation";
import {
  StoreCreateFormValues,
  storeCreateFormSchema,
} from "../_domain/form.schema";
import { storeDefaultFieldsValues } from "@/entities/store/_domain/form.schema";
import { useStoreCreateHandler } from "../_vm/useStoreCreate.handler";

interface StoreCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const StoreCreateForm: FC<StoreCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const {
    toSearch,
    settlementListToSelect,
    isAppearancePending: isPendingStore,
    isSuccess: isSuccessStore,
  } = useSettlemetListToSelect();

  const { handleSubmit, isPendingCreate } = useStoreCreateHandler();

  const isPendingComplexible = isPendingStore || isPendingCreate;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  return (
    <div className={cn(className, "w-full")}>
      <StoreFormElements<StoreCreateFormValues>
        handleSubmit={handleSubmit}
        schema={storeCreateFormSchema}
        defaultValues={storeDefaultFieldsValues}
      >
        {/* <StoreFormElements.FieldSettlementSelect /> */}
        <SettlementFormElements.FieldSettlementSelectSearch />
        <StoreFormElements.FieldName />
        {/* <StoreFormElements.FieldStoreList /> */}
        <StoreFormElements.FieldAddress />
        <StoreFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText={"Save change"}
        />
      </StoreFormElements>
    </div>
  );
};
