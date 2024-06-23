import { injectable } from "inversify";
import { ISettlementRepository } from "../_domain/repository.type";
import { SettlementSearchSelector } from "../_domain/settlement.type";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";

@injectable()
export class SettlementListSearchService {
  constructor(private readonly settlementRepo: ISettlementRepository) {}

  async execute(
    selector: SettlementSearchSelector,
  ): Promise<Array<Settlement>> {
    const { q } = selector;
    if (!q || q === "" || q.length < SEARCH_MIN_LENGTH) {
      return [];
    }
    return await this.settlementRepo.searchList(selector);
  }
}
