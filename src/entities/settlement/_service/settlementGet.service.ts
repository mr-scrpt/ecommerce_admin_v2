import { ISettlementRepository } from "@/kernel/domain/settlement/repository.type";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { injectable } from "inversify";
import { SettlementGetByRefSelector } from "../_domain/settlement.type";

@injectable()
export class SettlementGetByRefService {
  constructor(private readonly settlementRepo: ISettlementRepository) {}

  async execute(selector: SettlementGetByRefSelector): Promise<Settlement> {
    return await this.settlementRepo.getByRef(selector);
  }
}
