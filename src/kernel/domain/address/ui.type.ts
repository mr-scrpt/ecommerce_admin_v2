import { HTMLAttributes } from "react";

export interface AddressSelectProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  settlementRef: string;
  addressInit?: string | null;
  onSelectAddress?: (address: string) => void;
}

export interface AddressCreateProps {
  userId: string;
  settlementRef: string;
}
