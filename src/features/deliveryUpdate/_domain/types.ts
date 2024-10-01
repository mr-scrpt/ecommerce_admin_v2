import { DeliveryUpdateDTO } from "@/kernel/domain/delivery/delivery.dto";
import { DeliveryBase } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryTypeBase } from "@/kernel/domain/delivery/deliveryType.type";

// type DeliveryUpdatePayload = Partial<DeliveryTypeBase>;
// type DeliveryUpdatePayload = DeliveryTypeBase;
type DeliveryUpdatePayload = Omit<DeliveryBase, "orderId" | "userId">;

export type DeliveryUpdateTxPayload = {
  selector: DeliveryUpdateSelector;
  deliveryData: DeliveryUpdatePayload;
};

export type DeliveryUpdateTxDTO = {
  selector: DeliveryUpdateSelector;
  deliveryData: DeliveryUpdateDTO["data"];
};

// NOTE: Selector
export type DeliveryUpdateSelector = {
  id: string;
};
