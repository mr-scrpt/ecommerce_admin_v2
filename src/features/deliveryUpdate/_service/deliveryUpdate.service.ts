import { injectable } from "inversify";
import { IDeliveryUpdateTx } from "../_domain/transaction.type";
import { DeliveryUpdateTxPayload } from "../_domain/types";
import {
  Delivery,
  DeliveryTypeEnum,
} from "@/kernel/domain/delivery/delivery.type";

const ALWAYS_KEEP_FIELDS = [
  "userId",
  "deliveryType",
  "settlementRef",
  "receiverId",
];

const DELIVERY_TYPE_FIELDS: Record<DeliveryTypeEnum, string[]> = {
  [DeliveryTypeEnum.PICKUP]: ["storeId"],
  [DeliveryTypeEnum.POST]: ["postOffice"],
  [DeliveryTypeEnum.COURIER]: ["addressId"],
};

@injectable()
export class DeliveryUpdateService {
  constructor(private readonly deliveryUpdateTx: IDeliveryUpdateTx) {}

  async execute(payload: DeliveryUpdateTxPayload): Promise<Delivery> {
    const deliveryCreateDTO = await this.build(payload);
    return await this.deliveryUpdateTx.update(deliveryCreateDTO);
  }

  async build(
    payload: DeliveryUpdateTxPayload,
  ): Promise<DeliveryUpdateTxPayload> {
    const { deliveryData, ...otherPayloadData } = payload;

    const filteredDeliveryData = this.filterDeliveryObject(deliveryData);

    return {
      ...otherPayloadData,
      deliveryData: filteredDeliveryData,
    };
  }

  private filterDeliveryObject(obj: any): any {
    const result = { ...obj };
    const fieldsToKeep = [
      ...ALWAYS_KEEP_FIELDS,
      ...(DELIVERY_TYPE_FIELDS[obj.deliveryType as DeliveryTypeEnum] || []),
    ];

    for (const key in result) {
      if (!fieldsToKeep.includes(key)) {
        result[key] = null;
      }
    }

    return result;
  }
}
