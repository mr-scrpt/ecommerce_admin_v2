import { HTMLAttributes } from "react";

export interface PostSelectProps extends HTMLAttributes<HTMLDivElement> {
  postInit: string;
  settlementRef: string;
  onSelectPost?: (post: string) => void;
}
