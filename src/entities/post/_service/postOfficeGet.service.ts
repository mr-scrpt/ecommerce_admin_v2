import { PostOffice } from "@/kernel/domain/post/post.type";
import { IPostRepository } from "@/kernel/domain/post/repository.type";
import { injectable } from "inversify";
import {
  PostOfficeGetBySettlementRefSelector,
  PostOfficeGetSelector,
} from "../_domain/post.type";

@injectable()
export class PostOfficeGetService {
  constructor(private readonly postRepo: IPostRepository) {}

  async execute(selector: PostOfficeGetSelector): Promise<PostOffice> {
    console.log("output_log: SELECTOR =>>>", selector);
    // const { settlementRef } = selector;
    // // console.log("output_log: in service id =>>>", settlementRef);
    //
    // if (!settlementRef || settlementRef === "") {
    //   return [];
    // }

    // console.log("output_log:  =>>> after filter", settlementRef);
    const res = await this.postRepo.getPostOffice(selector);
    // console.log("output_log:  =>>> service result", res);

    return res;
  }
}
