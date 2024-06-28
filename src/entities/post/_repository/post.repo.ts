import { injectable } from "inversify";
import { PostOfficeNovaPoshtaIndex } from "@/kernel/lib/novaposhta/novaposhta.type";
import { INovaPoshtaRepository } from "@/kernel/lib/novaposhta/repository.type";
import { PostOfficeEntity } from "@/kernel/domain/post/post.type";
import { IPostRepository } from "@/kernel/domain/post/repository.type";
import { PostOfficeGetBySettlementDTO } from "@/kernel/domain/post/post.dto";

// TODO: Maybe move convert to service?
@injectable()
export class PostRepository implements IPostRepository {
  constructor(readonly novaposhta: INovaPoshtaRepository) {}

  async getPostOfficeListBySettlement(
    dto: PostOfficeGetBySettlementDTO,
  ): Promise<Array<PostOfficeEntity>> {
    const { settlementId } = dto;

    const postOfficeList =
      await this.novaposhta.getPostOfficeListBySettlement(settlementId);
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
