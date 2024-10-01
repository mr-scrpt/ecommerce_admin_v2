"use client";
import { SettlementFormElements } from "@/entities/settlement";
import { StoreFormElements } from "@/entities/store";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { storeUpdateFormSchema } from "../_domain/form.schema";
import { useStoreUpdateHandler } from "../_vm/useStoreUpdate.handler";
import { useStoreUpdateValues } from "../_vm/useStoreUpdateValues.model";

interface StoreFormProps extends HTMLAttributes<HTMLDivElement> {
  storeId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const StoreFormUpdate: FC<StoreFormProps> = (props) => {
  const { storeId, callbackUrl, className, onSuccess } = props;

  const { handleStoreUpdate, isPendingUpdate, isSuccessUpdate } =
    useStoreUpdateHandler({ data: { storeId }, onSuccess, callbackUrl });
  const {
    storeUpdateValues,
    isPendingStore,
    isSuccessStore,
    isFetchedAfterMountStore,
  } = useStoreUpdateValues({ storeId });

  return (
    <div className={cn(className, "w-full")}>
      <StoreFormElements
        handleSubmit={handleStoreUpdate}
        defaultValues={storeUpdateValues}
        schema={storeUpdateFormSchema}
      >
        <SettlementFormElements.FieldSettlementSelectSearch />
        <StoreFormElements.FieldName />
        <StoreFormElements.FieldAddressLine />
        <StoreFormElements.SubmitButton
          isPending={isPendingUpdate}
          submitText={"Save change"}
        />
      </StoreFormElements>
    </div>
  );
};
