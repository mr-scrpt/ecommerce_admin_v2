import { FC, HTMLAttributes } from "react";

import { useAddressListByUserAndSettlementRefToSelectModel } from "@/entities/address/_vm/useAddressListByUserAndSettlementRefToSelect.model";
import { AddressDefaultSelectOption } from "@/kernel/domain/address/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { MultiSelectElementInner } from "@/shared/ui/select/multiSelectElement";

export interface AddressMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef?: string;
  addressListActive?: Array<AddressDefaultSelectOption>;
  onSelectAddress: (addressList: Array<AddressDefaultSelectOption>) => void;
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
    <MultiSelectElementInner
      optionList={addressListToSelect}
      optionActiveList={addressListActive}
      onSelect={onSelectAddress}
    />
  );
};
