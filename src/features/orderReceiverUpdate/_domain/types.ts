import { OrderReceiverUpdateDTO } from "@/kernel/domain/order/order.dto";

type OrderReceiverUpdatePayload = {
  receiverId: string;
};

export type OrderReceiverUpdateTxPayload = {
  selector: OrderReceiverUpdateSelector;
  orderReceiverData: OrderReceiverUpdatePayload;
};

export type OrderReceiverUpdateTxDTO = {
  selector: OrderReceiverUpdateSelector;
  orderReceiverData: OrderReceiverUpdateDTO["data"];
};

// NOTE: Selector
export type OrderReceiverUpdateSelector = {
  id: string;
};
