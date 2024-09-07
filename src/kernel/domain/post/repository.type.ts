import { PostOfficeGetBySettlementRefDTO, PostOfficeGetDTO } from "./post.dto";
import { PostOfficeEntity } from "./post.type";

export abstract class IPostRepository {
  abstract getPostOffice(dto: PostOfficeGetDTO): Promise<PostOfficeEntity>;
  abstract getPostOfficeListBySettlementRef(
    dto: PostOfficeGetBySettlementRefDTO,
  ): Promise<Array<PostOfficeEntity>>;
}
