import { Order } from "@/entities/order";
import { injectable } from "inversify";
import { IOrderRowCreateTx } from "../_domain/transaction.type";
import { OrderRowCreateTxPayload } from "../_domain/types";

@injectable()
export class OrderRowCreateService {
  constructor(private readonly orderRowCreateTx: IOrderRowCreateTx) {}

  async execute(payload: OrderRowCreateTxPayload): Promise<Order> {
    return await this.orderRowCreateTx.create(payload);
  }
}
