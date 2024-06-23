import { injectable } from "inversify";
import { PostRepository } from "../_repository/post.repo";
import {
  PostOffice,
  PostOfficeGetBySettlementSelector,
} from "../_domain/post.type";

@injectable()
export class PostOfficeListGetService {
  constructor(private readonly postRepo: PostRepository) {}

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
