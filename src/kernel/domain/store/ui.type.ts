import { HTMLAttributes } from "react";

export interface StoreSelectProps extends HTMLAttributes<HTMLDivElement> {
  storeInit: string | null;
  settlementRef: string;
  onSelectStore?: (store: string) => void;
}
