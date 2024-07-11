import { DeliveryUpdateDTO } from "@/kernel/domain/delivery/delivery.dto";
import { DeliveryBase } from "@/kernel/domain/delivery/delivery.type";

type DeliveryUpdatePayload = Partial<DeliveryBase>;

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
