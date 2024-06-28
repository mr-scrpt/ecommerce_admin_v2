import { injectable } from "inversify";
import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { ConsumerGetSelector } from "../_domain/consumer.type";

@injectable()
export class ConsumerGetService {
  constructor(private readonly consumerRepo: IConsumerRepository) {}

  async execute(selector: ConsumerGetSelector): Promise<ConsumerEntity> {
    return await this.consumerRepo.get(selector);
  }
}
