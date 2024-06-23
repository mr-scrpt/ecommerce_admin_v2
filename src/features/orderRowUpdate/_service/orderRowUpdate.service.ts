import { Order } from "@/entities/order";
import { injectable } from "inversify";
import { OrderRowUpdateTxPayload } from "../_domain/types";
import { IOrderRowUpdateTx } from "../_domain/transaction.type";

@injectable()
export class OrderRowUpdateService {
  constructor(private readonly orderRowUpdateTx: IOrderRowUpdateTx) {}

  async execute(payload: OrderRowUpdateTxPayload): Promise<Order> {
    return this.orderRowUpdateTx.update(payload);
  }
}
