import { FC, HTMLAttributes } from "react";

import { useAddressListByUserAndSettlementRefToSelectModel } from "@/entities/address/_vm/useAddressListByUserAndSettlementRefToSelect.model";
import { SelectOptionItem } from "@/shared/type/select";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";

export interface AddressSelectProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef: string;
  addressActive?: SelectOptionItem;
  onSelectAddress: (addressList: Array<SelectOptionItem>) => void;
}
export const AddressSelectElement: FC<AddressSelectProps> = (props) => {
  const { addressActive, userId, settlementRef, onSelectAddress } = props;

  const {
    addressListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  } = useAddressListByUserAndSettlementRefToSelectModel({
    userId,
    settlementRef,
  });

  console.log("output_log: userId =>>>", userId);
  console.log("output_log: settlementRef =>>>", settlementRef);
  console.log("output_log: SELECT =>>>", addressListToSelect);

  const placeholder = isAppearancePending ? "Loading..." : "Select address";

  if (!isFetchedAfterMount || isAppearancePending) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionActive={addressActive}
      onSelect={onSelectAddress}
      optionList={addressListToSelect}
      placeholder={placeholder}
    />
  );
  // return (
  //   <Select
  //     defaultValue={addressInit || ""}
  //     onValueChange={onSelectAddress}
  //     disabled={!addressListToSelect.length}
  //   >
  //     <FormControl>
  //       <SelectTrigger>
  //         <SelectValue placeholder={placeholder} />
  //       </SelectTrigger>
  //     </FormControl>
  //     <SelectContent>
  //       {addressListToSelect.map((address) => (
  //         <SelectItem key={address.value} value={address.value}>
  //           {address.label}
  //         </SelectItem>
  //       ))}
  //     </SelectContent>
  //   </Select>
  // );
};
