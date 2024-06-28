import { PostOffice } from "@/kernel/domain/post/post.type";
import { IPostRepository } from "@/kernel/domain/post/repository.type";
import { injectable } from "inversify";
import { PostOfficeGetBySettlementSelector } from "../_domain/post.type";

@injectable()
export class PostOfficeListGetService {
  constructor(private readonly postRepo: IPostRepository) {}

  async execute(
    selector: PostOfficeGetBySettlementSelector,
  ): Promise<Array<PostOffice>> {
    const { settlementId } = selector;

    if (!settlementId || settlementId === "") {
      return [];
    }

    return await this.postRepo.getPostOfficeListBySettlement(selector);
  }
}
