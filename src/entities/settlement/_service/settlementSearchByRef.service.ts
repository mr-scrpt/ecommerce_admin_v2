import { ISettlementRepository } from "@/kernel/domain/settlement/repository.type";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { injectable } from "inversify";
import { SettlementSearchByRefSelector } from "../_domain/settlement.type";

@injectable()
export class SettlementSearchByRefService {
  constructor(private readonly settlementRepo: ISettlementRepository) {}

  async execute(
    selector: SettlementSearchByRefSelector,
  ): Promise<Settlement | null> {
    return await this.settlementRepo.searchByRef(selector);
  }
}
