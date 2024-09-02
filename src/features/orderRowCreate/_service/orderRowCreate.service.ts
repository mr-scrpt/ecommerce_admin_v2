import { injectable } from "inversify";

import { IOrderRowCreateTx } from "../_domain/transaction.type";
import { OrderRowCreateTxPayload } from "../_domain/types";
import { Order } from "@prisma/client";

@injectable()
export class OrderRowCreateService {
  constructor(private readonly orderRowCreateTx: IOrderRowCreateTx) {}

  async execute(payload: OrderRowCreateTxPayload): Promise<Order> {
    return await this.orderRowCreateTx.create(payload);
  }
}
