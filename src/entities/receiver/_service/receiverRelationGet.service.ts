import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { injectable } from "inversify";
import {
  ReceiverGetSelector,
  ReceiverRelation,
} from "../_domain/receiver.types";

@injectable()
export class ReceiverRelationGetService {
  constructor(private readonly receiverRepo: IReceiverRepository) {}

  async execute(selector: ReceiverGetSelector): Promise<ReceiverRelation> {
    return await this.receiverRepo.getWithRelation(selector);
  }
}
