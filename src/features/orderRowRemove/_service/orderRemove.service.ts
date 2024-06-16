import { Order } from "@/entities/order";
import { injectable } from "inversify";
import { IOrderRowRemoveTx } from "../_domain/transaction.type";
import { OrderRowRemoveTxPayload } from "../_domain/types";

@injectable()
export class OrderRowRemoveService {
  constructor(private readonly orderRowRemoveTx: IOrderRowRemoveTx) {}

  async execute(payload: OrderRowRemoveTxPayload): Promise<Order> {
    return this.orderRowRemoveTx.remove(payload);
  }
}
