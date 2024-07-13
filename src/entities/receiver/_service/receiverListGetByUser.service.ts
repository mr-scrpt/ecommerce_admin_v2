import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { injectable } from "inversify";
import { ReceiverGetByUserSelector } from "../_domain/receiver.types";

@injectable()
export class ReceiverListGetByUserService {
  constructor(private readonly receiverRepo: IReceiverRepository) {}

  async execute(selector: ReceiverGetByUserSelector): Promise<Receiver[]> {
    return await this.receiverRepo.getListByUser(selector);
  }
}
