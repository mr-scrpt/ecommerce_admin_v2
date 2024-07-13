import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { injectable } from "inversify";
import { IReceiverCreateTx } from "../_domain/transaction.type";
import { ReceiverCreateTxPayload } from "../_domain/types";

@injectable()
export class ReceiverCreateService {
  constructor(private readonly receiverCreateTx: IReceiverCreateTx) {}

  async execute(payload: ReceiverCreateTxPayload): Promise<Receiver> {
    return await this.receiverCreateTx.create(payload);
  }
}
