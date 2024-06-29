import { ORDER_PRICE_TOTAL_DEFAULT } from "@/entities/order";
import { IOrderGenerateNumberService } from "@/entities/order/server";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";
import {
  Order,
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";
import { injectable } from "inversify";
import { merge } from "lodash";
import { IOrderCreateTx } from "../_domain/transaction.type";
import {
  OrderCreateEmptyTxPayload,
  OrderEmptyCreateTxDTO,
} from "../_domain/types";

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
        orderStatus: OrderStatusEnum.TEMP,
        paymentStatus: OrderPaymentStatusEnum.TEMP,

        priceTotal: ORDER_PRICE_TOTAL_DEFAULT,
        orderNo,
      },
      deliveryData: {
        deliveryType: DeliveryTypeEnum.POST,
        settlement: "",
        street: null,
        house: null,
        apartment: null,
        postOffice: null,
        pickupPoint: null,
      },
    });

    return orderData;
  }
}
