import { injectable } from "inversify";
import { ISettlementRepository } from "../_domain/repository.type";
import {
  Settlement,
  SettlementSearchSelector,
} from "../_domain/settlement.type";

@injectable()
export class SettlementListSearchService {
  constructor(private readonly settlementRepo: ISettlementRepository) {}

  async execute(
    selector: SettlementSearchSelector,
  ): Promise<Array<Settlement>> {
    return await this.settlementRepo.searchList(selector);
  }
}
