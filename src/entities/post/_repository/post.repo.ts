import { injectable } from "inversify";
import { PostOfficeGetBySettlementDTO } from "../_domain/post.dto";
import { PostOfficeEntity } from "../_domain/post.type";
import { PostOfficeNovaPoshtaIndex } from "@/kernel/lib/novaposhta/novaposhta.type";
import { INovaPoshtaRepository } from "@/kernel/lib/novaposhta/repository.type";

@injectable()
export class PostRepository {
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
