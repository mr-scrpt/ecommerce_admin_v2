import { PostOfficeGetBySettlementRefDTO } from "./post.dto";
import { PostOfficeEntity } from "./post.type";

export abstract class IPostRepository {
  abstract getPostOfficeListBySettlementRef(
    dto: PostOfficeGetBySettlementRefDTO,
  ): Promise<Array<PostOfficeEntity>>;
}
