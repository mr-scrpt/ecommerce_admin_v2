import { injectable } from "inversify";
import { IDeliveryUpdateTx } from "../_domain/transaction.type";
import { DeliveryUpdateTxPayload } from "../_domain/types";
import {
  Delivery,
  DELIVERY_TYPE,
} from "@/kernel/domain/delivery/delivery.type";

// const ALWAYS_KEEP_FIELDS = [
//   "userId",
//   "deliveryTypeId",
//   "settlementRef",
//   "receiverId",
// ];
//
// const DELIVERY_TYPE_FIELDS: Record<DELIVERY_TYPE, string[]> = {
//   [DELIVERY_TYPE.PICKUP]: ["storeId"],
//   [DELIVERY_TYPE.POST]: ["postOfficeId"],
//   [DELIVERY_TYPE.COURIER]: ["addressId"],
// };

@injectable()
export class DeliveryUpdateService {
  constructor(private readonly deliveryUpdateTx: IDeliveryUpdateTx) {}

  async execute(payload: DeliveryUpdateTxPayload): Promise<Delivery> {
    // const deliveryCreateDTO = await this.build(payload);
    return await this.deliveryUpdateTx.update(payload);
  }

  // async build(
  //   payload: DeliveryUpdateTxPayload,
  // ): Promise<DeliveryUpdateTxPayload> {
  //   const { deliveryData, ...otherPayloadData } = payload;
  //
  //   const filteredDeliveryData = this.filterDeliveryObject(deliveryData);
  //
  //   return {
  //     ...otherPayloadData,
  //     deliveryData: filteredDeliveryData,
  //   };
  // }
  //
  // private filterDeliveryObject(obj: any): any {
  //   const result = { ...obj };
  //   const fieldsToKeep = [
  //     ...ALWAYS_KEEP_FIELDS,
  //     ...(DELIVERY_TYPE_FIELDS[obj.deliveryType as DELIVERY_TYPE] || []),
  //   ];
  //
  //   for (const key in result) {
  //     if (!fieldsToKeep.includes(key)) {
  //       result[key] = null;
  //     }
  //   }
  //
  //   return result;
  // }
}
