import { PostOfficeGetBySettlementRefDTO } from "@/kernel/domain/post/post.dto";
import { PostOfficeEntity } from "@/kernel/domain/post/post.type";
import { IPostRepository } from "@/kernel/domain/post/repository.type";
import { PostOfficeNovaPoshtaIndex } from "@/kernel/lib/novaposhta/novaposhta.type";
import { INovaPoshtaRepository } from "@/kernel/lib/novaposhta/repository.type";
import { injectable } from "inversify";

// TODO: Maybe move convert to service?
@injectable()
export class PostRepository implements IPostRepository {
  constructor(readonly novaposhta: INovaPoshtaRepository) {}

  async getPostOfficeListBySettlementRef(
    dto: PostOfficeGetBySettlementRefDTO,
  ): Promise<Array<PostOfficeEntity>> {
    const { settlementRef } = dto;

    const postOfficeList =
      await this.novaposhta.getPostOfficeListBySettlementRef(settlementRef);

    const postOfficeListConverted: Array<PostOfficeEntity> = [];

    for await (const postOffice of postOfficeList) {
      postOfficeListConverted.push(this.convertToLowerCase(postOffice));
    }
    return postOfficeListConverted;
  }

  private convertToLowerCase(
    settlementData: PostOfficeNovaPoshtaIndex,
  ): PostOfficeEntity {
    const convertedSettle: any = {};
    for (const key in settlementData) {
      if (Object.prototype.hasOwnProperty.call(settlementData, key)) {
        const convertedKey = key.charAt(0).toLowerCase() + key.slice(1);
        convertedSettle[convertedKey as keyof PostOfficeEntity] =
          settlementData[key];
      }
    }
    return convertedSettle;
  }
}
