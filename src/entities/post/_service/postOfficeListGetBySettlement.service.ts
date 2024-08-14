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
    console.log("output_log: in service id =>>>", settlementRef);

    if (!settlementRef || settlementRef === "") {
      return [];
    }

    console.log("output_log:  =>>> after filter", settlementRef);
    const res = await this.postRepo.getPostOfficeListBySettlementRef(selector);
    console.log("output_log:  =>>> service result", res);

    return res;
  }
}
