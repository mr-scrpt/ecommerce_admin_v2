import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { injectable } from "inversify";
import { ReceiverGetByOrderSelector } from "../_domain/receiver.types";

@injectable()
export class ReceiverListGetByOrderService {
  constructor(private readonly receiverRepo: IReceiverRepository) {}

  async execute(selector: ReceiverGetByOrderSelector): Promise<Receiver[]> {
    return await this.receiverRepo.getListByOrder(selector);
  }
}
