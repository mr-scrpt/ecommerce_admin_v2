import { HTMLAttributes } from "react";

export interface PostSelectProps extends HTMLAttributes<HTMLDivElement> {
  postInit?: string | null;
  settlementRef: string;
  onSelectPost?: (post: string) => void;
}
