import { ORDER_PRICE_TOTAL_DEFAULT } from "@/entities/order";
import { IOrderGenerateNumberService } from "@/entities/order/server";
import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import {
  ORDER_STATUS_PAYMENT,
  ORDER_STATUS_STATE,
} from "@/kernel/domain/order/orderStatus.type";
import { injectable } from "inversify";
import { merge } from "lodash";
import { IOrderCreateTx } from "../_domain/transaction.type";
import {
  OrderCreateEmptyTxPayload,
  OrderEmptyCreateTxDTO,
} from "../_domain/types";
import { Order } from "@/kernel/domain/order/order.type";

@injectable()
export class OrderEmptyCreateService {
  constructor(
    private readonly orderCreateTx: IOrderCreateTx,
    private readonly orderGenerateNumber: IOrderGenerateNumberService,
  ) {}

  async execute(payload: OrderCreateEmptyTxPayload): Promise<Order> {
    const orderCreateDTO = this.build(payload);
    return await this.orderCreateTx.createEmpty(orderCreateDTO);
  }

  private build(payload: OrderCreateEmptyTxPayload): OrderEmptyCreateTxDTO {
    const orderNo = this.orderGenerateNumber.execute();
    const orderData = merge({}, payload, {
      orderData: {
        ...payload.orderData,
        orderStatus: ORDER_STATUS_STATE.TEMP,
        paymentStatus: ORDER_STATUS_PAYMENT.TEMP,

        priceTotal: ORDER_PRICE_TOTAL_DEFAULT,
        orderNo,
      },
      deliveryData: {
        userId: payload.orderData.userId,
        deliveryType: DELIVERY_TYPE.POST,
        settlementRef: null,
        postOffice: null,
        addressId: null,
        storeId: null,
      },
    });

    return orderData;
  }
}
