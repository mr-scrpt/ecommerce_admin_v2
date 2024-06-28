import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { injectable } from "inversify";
import { ConsumerSearchSelector } from "../_domain/consumer.type";

@injectable()
export class ConsumerListSearchService {
  constructor(private readonly consumerRepo: IConsumerRepository) {}

  async execute(
    selector: ConsumerSearchSelector,
  ): Promise<Array<ConsumerEntity>> {
    const { q } = selector;
    if (!q) {
      return [];
    }
    return await this.consumerRepo.searchList(selector);
  }
}
