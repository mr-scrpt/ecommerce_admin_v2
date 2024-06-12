import { ORDER_PRICE_TOTAL_DEFAULT, Order } from "@/entities/order";
import { injectable } from "inversify";
import {
  OrderCreateEmptyTxPayload,
  OrderEmptyCreateTxDTO,
} from "../_domain/types";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";
import { merge } from "lodash";
import { IOrderCreateTx } from "../_domain/transaction.type";

@injectable()
export class OrderEmptyCreateService {
  constructor(private readonly orderCreateTx: IOrderCreateTx) {}

  async execute(payload: OrderCreateEmptyTxPayload): Promise<Order> {
    const orderCreateDTO = this.build(payload);
    return await this.orderCreateTx.createEmpty(orderCreateDTO);
  }

  private build(payload: OrderCreateEmptyTxPayload): OrderEmptyCreateTxDTO {
    return merge({}, payload, {
      orderData: {
        ...payload.orderData,
        orderStatus: OrderStatusEnum.TEMP,
        paymentStatus: OrderPaymentStatusEnum.TEMP,

        priceTotal: ORDER_PRICE_TOTAL_DEFAULT,
      },
    });
  }
}
