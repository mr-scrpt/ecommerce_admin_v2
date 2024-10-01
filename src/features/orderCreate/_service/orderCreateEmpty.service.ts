import { ORDER_PRICE_TOTAL_DEFAULT } from "@/entities/order";
import { IOrderGenerateNumberService } from "@/entities/order/server";
import { IDeliveryTypeRepository } from "@/kernel/domain/delivery/repository.type";
import { Order } from "@/kernel/domain/order/order.type";
import { IOrderStatusRepository } from "@/kernel/domain/order/repository.type";
import { injectable } from "inversify";
import { IOrderCreateTx } from "../_domain/transaction.type";
import {
  OrderCreateEmptyTxPayload,
  OrderEmptyCreateTxDTO,
} from "../_domain/types";

interface IOrderCreateEmptyPayloadWithStatusDate
  extends OrderCreateEmptyTxPayload {
  statusData: {
    statusStateId: string;
    statusPaymentId: string;
  };
  deliveryData: {
    deliveryTypeId: string;
  };
}
@injectable()
export class OrderEmptyCreateService {
  constructor(
    private readonly orderCreateTx: IOrderCreateTx,
    private readonly orderGenerateNumber: IOrderGenerateNumberService,
    private readonly orderStatusRepo: IOrderStatusRepository,
    private readonly deliveryTypeRepo: IDeliveryTypeRepository,
  ) {}

  async execute(payload: OrderCreateEmptyTxPayload): Promise<Order> {
    const { id: statusStateId } =
      await this.orderStatusRepo.getStatusDefaultState();

    const { id: statusPaymentId } =
      await this.orderStatusRepo.getStatusDefaultPayment();

    const { id: deliveryTypeId } = await this.deliveryTypeRepo.getDefault();

    const orderCreateDTO = this.build({
      ...payload,
      statusData: { statusStateId, statusPaymentId },
      deliveryData: { deliveryTypeId },
    });

    return await this.orderCreateTx.createEmpty(orderCreateDTO);
  }

  private build(
    payload: IOrderCreateEmptyPayloadWithStatusDate,
  ): OrderEmptyCreateTxDTO {
    const { statusData, orderData, deliveryData } = payload;
    const { userId } = orderData;
    const { deliveryTypeId } = deliveryData;

    const orderNo = this.orderGenerateNumber.execute();

    const orderBuildData: OrderEmptyCreateTxDTO = {
      orderData: {
        priceTotal: ORDER_PRICE_TOTAL_DEFAULT,
        orderNo,
      },
      deliveryData: {
        userId: payload.orderData.userId,
        deliveryTypeId,

        settlementRef: null,
        postOfficeId: null,
        addressId: null,
        storeId: null,
      },
      statusData: {
        orderStatusStateId: statusData.statusStateId,
        orderStatusPaymentId: statusData.statusPaymentId,
      },
      userData: { userId },
    };

    return orderBuildData;
  }
}
