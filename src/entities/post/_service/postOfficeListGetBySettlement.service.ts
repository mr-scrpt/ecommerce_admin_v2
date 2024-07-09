import { PostOffice } from "@/kernel/domain/post/post.type";
import { IPostRepository } from "@/kernel/domain/post/repository.type";
import { injectable } from "inversify";
import { PostOfficeGetBySettlementRefSelector } from "../_domain/post.type";

@injectable()
export class PostOfficeListGetBySettlementRefService {
  constructor(private readonly postRepo: IPostRepository) {}

  async execute(
    selector: PostOfficeGetBySettlementRefSelector,
  ): Promise<Array<PostOffice>> {
    const { settlementRef } = selector;

    if (!settlementRef || settlementRef === "") {
      return [];
    }

    return await this.postRepo.getPostOfficeListBySettlementRef(selector);
  }
}
