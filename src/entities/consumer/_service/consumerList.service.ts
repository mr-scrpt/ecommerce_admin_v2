import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { injectable } from "inversify";

@injectable()
export class ConsumerListService {
  constructor(private readonly consumerRepo: IConsumerRepository) {}

  async execute(): Promise<Array<ConsumerEntity>> {
    return await this.consumerRepo.getList();
  }
}
