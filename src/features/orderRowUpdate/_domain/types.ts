import { OrderRowUpdateDTO } from "@/kernel/domain/order/orderRow.dto";
import { OrderRowBase } from "@/kernel/domain/order/orderRow.type";

type OrderRowUpdatePayload = Partial<OrderRowBase>;

export type OrderRowUpdateTxPayload = {
  selector: OrderRowUpdateSelector;
  orderRowData: OrderRowUpdatePayload;
};

export type OrderRowUpdateTxDTO = {
  selector: OrderRowUpdateSelector;
  orderRowData: OrderRowUpdateDTO["data"];
};

// NOTE: Selector
export type OrderRowUpdateSelector = {
  id: string;
};
