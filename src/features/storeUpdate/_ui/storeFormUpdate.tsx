"use client";
import {
  StoreFormElements,
  storeFormDefaultSchema,
  useStoreQuery,
} from "@/entities/store";
import { usePropertyLikeSelectOptionList } from "@/entities/property";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState } from "react";
import { z } from "zod";
import { useStoreUpdateMutation } from "../_mutation/useStoreUpdate.mutation";
import { useOptionListTransform } from "@/shared/lib/map";
import { useSettlementListSearchToSelectQuery } from "@/entities/settlement";

interface StoreFormProps extends HTMLAttributes<HTMLDivElement> {
  storeId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type StoreFormValues = z.infer<typeof storeFormDefaultSchema>;

export const StoreFormUpdate: FC<StoreFormProps> = (props) => {
  const { storeId, callbackUrl, className, onSuccess } = props;

  const [selectedSettlement, setSelectedSettlement] = useState<string>("");
  const {
    isPending: isPendingStore,
    isFetchedAfterMount,
    store,
  } = useStoreQuery(storeId);

  const router = useRouter();

  const { storeUpdate, isPending: isPendingUpdate } = useStoreUpdateMutation();

  const { propertySelectOptionList, isPending: isPendingOptionList } =
    usePropertyLikeSelectOptionList();

  const { toDataIdList, toOptionList } = useOptionListTransform();
  const { toSearch, settlementListToSelect } =
    useSettlementListSearchToSelectQuery();

  const isPendingComplexible =
    isPendingStore ||
    isPendingUpdate ||
    !isFetchedAfterMount ||
    isPendingOptionList;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!store) {
    return <div>Failed to load store, you may not have permissions</div>;
  }

  const handleSubmit = async (data: StoreFormValues) => {
    await storeUpdate({
      storeId: store.id,
      data: {
        ...data,
        id: store.id,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <StoreFormElements
        store={store}
        handleSubmit={handleSubmit}
        schema={storeFormDefaultSchema}
      >
        <StoreFormElements.FieldSettlement
          settlementListToSelect={settlementListToSelect}
          toSearch={toSearch}
          handleSelect={setSelectedSettlement}
        />
        <StoreFormElements.FieldAddress />
      </StoreFormElements>
    </div>
  );
};
