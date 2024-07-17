"use client";
import { useSettlemetListToSelect } from "@/entities/settlement";
import { StoreFormDefaultValues, StoreFormElements } from "@/entities/store";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useStoreCreateMutation } from "../_mutation/useStoreCreate.mutation";
import { storeCreateFormSchema } from "../_domain/form.schema";

interface StoreCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const StoreCreateForm: FC<StoreCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  // const [selectedSettlement, setSelectedSettlement] = useState<string>("");

  const router = useRouter();

  const { storeCreate, isPending: isPendingCreate } = useStoreCreateMutation();

  const {
    toSearch,
    settlementListToSelect,
    isAppearancePending: isPendingStore,
    isSuccess: isSuccessStore,
  } = useSettlemetListToSelect();

  const isPendingComplexible = isPendingStore || isPendingCreate;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  const handleSubmit = async (data: StoreFormDefaultValues) => {
    await storeCreate({
      storeData: data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <StoreFormElements
        handleSubmit={handleSubmit}
        schema={storeCreateFormSchema}
      >
        <StoreFormElements.FieldSettlementSelect />
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
