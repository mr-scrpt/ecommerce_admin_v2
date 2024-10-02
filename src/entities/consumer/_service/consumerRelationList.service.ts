import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { injectable } from "inversify";
import { ConsumerRelationEntity } from "../_domain/consumer.type";

@injectable()
export class ConsumerRelationListService {
  constructor(private readonly consumerRepo: IConsumerRepository) {}

  async execute(): Promise<Array<ConsumerRelationEntity>> {
    return await this.consumerRepo.getWithRelationList();
  }
}
