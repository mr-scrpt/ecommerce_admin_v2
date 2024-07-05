import { HTMLAttributes } from "react";

export interface StoreSelectProps extends HTMLAttributes<HTMLDivElement> {
  storeInit: string;
  settlementRef: string;
  onSelectStore?: (store: string) => void;
}
