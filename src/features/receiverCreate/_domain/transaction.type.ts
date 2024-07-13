import { ReceiverEntity } from "@/kernel/domain/receiver/receiver.type";
import { ReceiverCreateTxDTO } from "./types";

export abstract class IReceiverCreateTx {
  abstract create(dto: ReceiverCreateTxDTO): Promise<ReceiverEntity>;
}
