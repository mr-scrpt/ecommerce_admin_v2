import { HTMLAttributes } from "react";

export interface ReceiverSelectProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  receiverInit?: string | null;
  onSelectReceiver?: (receiver: string) => void;
}

export interface ReceiverCreateProps {
  userId: string;
}
