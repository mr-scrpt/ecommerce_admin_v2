import { PostOfficeGetBySettlementDTO } from "./post.dto";
import { PostOfficeEntity } from "./post.type";

export abstract class IPostRepository {
  abstract getPostOfficeListBySettlement(
    dto: PostOfficeGetBySettlementDTO,
  ): Promise<Array<PostOfficeEntity>>;
}
