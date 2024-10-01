"use client";
import { SettlementFormElements } from "@/entities/settlement";
import { StoreFormElements, storeDefaultFieldsValues } from "@/entities/store";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  StoreCreateFormValues,
  storeCreateFormSchema,
} from "../_domain/form.schema";
import { useStoreCreateHandler } from "../_vm/useStoreCreate.handler";

interface StoreCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const StoreCreateForm: FC<StoreCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const { handleStoreCreate, isPendingCreate, isSuccessCreate } =
    useStoreCreateHandler({ callbackUrl, onSuccess });

  if (isPendingCreate) {
    return <Spinner aria-label="Loading profile..." />;
  }

  return (
    <div className={cn(className, "w-full")}>
      <StoreFormElements<StoreCreateFormValues>
        handleSubmit={handleStoreCreate}
        schema={storeCreateFormSchema}
        defaultValues={storeDefaultFieldsValues}
      >
        <SettlementFormElements.FieldSettlementSelectSearch />
        <StoreFormElements.FieldName />
        <StoreFormElements.FieldAddressLine />
        <StoreFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText={"Create store"}
        />
      </StoreFormElements>
    </div>
  );
};
