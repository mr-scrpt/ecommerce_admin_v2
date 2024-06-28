import { OrderRowBase } from "@/entities/order";
import { OrderRowUpdateDTO } from "@/kernel/domain/order/orderRow.dto";

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
