import { FC, HTMLAttributes } from "react";

import { useAddressListByUserAndSettlementRefToSelectModel } from "@/entities/address/_vm/useAddressListByUserAndSettlementRefToSelect.model";
import { SelectOptionItem } from "@/shared/type/select";
import { Spinner } from "@/shared/ui/icons/spinner";
import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";

export interface AddressMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef: string;
  addressListActive?: Array<SelectOptionItem>;
  onSelectAddress: (addressList: Array<SelectOptionItem>) => void;
}
export const AddressMultiSelectElement: FC<AddressMultiSelectProps> = (
  props,
) => {
  const { addressListActive, userId, settlementRef, onSelectAddress } = props;

  const {
    addressListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  } = useAddressListByUserAndSettlementRefToSelectModel({
    userId,
    settlementRef,
  });

  if (!isFetchedAfterMount || isAppearancePending) {
    return <Spinner />;
  }

  return (
    <MultiSelectElement
      optionList={addressListToSelect}
      optionActiveList={addressListActive}
      onSelect={onSelectAddress}
    />
  );
};
