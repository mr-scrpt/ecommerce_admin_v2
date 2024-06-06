import { AuthorizatoinError } from "@/shared/lib/errors";
import { PostOfficeNovaPoshtaIndex } from "@/kernel/lib/novaposhta/novaposhta.type";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createDeliveryAbility } from "../_domain/delivery.ability";
import {
  PostOfficeEntity,
  PostOfficeToSelect,
} from "../_domain/post.type";
import { NovaPoshtaRepository } from "../_repository/novaposhta.repo";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";

type GetPostOfficeList = {
  session: SessionEntity;
  settlement: string;
};

@injectable()
export class GetPostOfficeListToSelectUseCase {
  constructor(private readonly npRepo: NovaPoshtaRepository) {}

  async exec(data: GetPostOfficeList): Promise<PostOfficeToSelect[]> {
    const { session, settlement } = data;
    const { canGetDelivery } = createDeliveryAbility(session);

    if (!canGetDelivery()) {
      throw new AuthorizatoinError();
    }

    if (
      !settlement ||
      settlement === "" ||
      settlement.length < SEARCH_MIN_LENGTH
    ) {
      return [];
    }

    const postOfficeList = await this.npRepo.getPostOfficeList(settlement);

    const convertedPostOfficeList: Array<PostOfficeEntity> = [];

    for await (const postOffice of postOfficeList) {
      convertedPostOfficeList.push(this.convertToLowerCase(postOffice));
    }

    return await this.mapToSelect(convertedPostOfficeList);
  }

  async mapToSelect(
    data: Array<PostOfficeEntity>,
  ): Promise<Array<PostOfficeToSelect>> {
    return data.map((postOffice) => {
      return {
        value: postOffice.ref,
        type: postOffice.categoryOfWarehouse,
        label: postOffice.description,
      };
    });
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
