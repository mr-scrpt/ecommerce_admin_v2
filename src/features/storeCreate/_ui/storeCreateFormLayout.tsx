"use client";
import { SettleToSelect } from "@/entities/settlement";
import {
  StoreFormDefaultValues,
  StoreFormElements,
  StoreRelation,
  storeFormDefaultSchema,
} from "@/entities/store";
import { FC, HTMLAttributes } from "react";

interface StoreCreateFormLayoutProps extends HTMLAttributes<HTMLFormElement> {
  store?: StoreRelation;
  handleSubmit: (data: StoreFormDefaultValues) => void;
  toSearch: (q: string) => void;
  isPending: boolean;
  submitText: string;
  settlementListToSelect: Array<SettleToSelect>;
}

export const StoreCreateFormLayout: FC<StoreCreateFormLayoutProps> = (
  props,
) => {
  const {
    store,
    handleSubmit,
    isPending,
    submitText,
    settlementListToSelect,
    toSearch,
    // setSelectedSettlement,
  } = props;

  return (
    <StoreFormElements
      storeData={store}
      handleSubmit={handleSubmit}
      schema={storeFormDefaultSchema}
    >
      <StoreFormElements.FieldName />
      <StoreFormElements.FieldSettlement
        settlementListToSelect={settlementListToSelect}
        toSearch={toSearch}
        // handleSelect={setSelectedSettlement}
      />
      <StoreFormElements.FieldStoreList
      // settlementRef={"e71f8842-4b33-11e4-ab6d-005056801329"}
      />
      <StoreFormElements.FieldAddress />
      <StoreFormElements.SubmitButton
        isPending={isPending}
        submitText={submitText}
      />
    </StoreFormElements>
  );
};
