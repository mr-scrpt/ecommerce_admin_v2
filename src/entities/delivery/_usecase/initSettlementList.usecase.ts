import { injectable } from "inversify";
import { SettlementNovaPosthaIndex } from "../_domain/novaposhta.type";
import { SettlementEntity } from "../_domain/settlement.type";
import { NovaPoshtaRepository } from "../_repository/novaposhta.repo";
import { SettlementRepository } from "../_repository/settlement.repo";

const INIT_PAGE = 1;
@injectable()
export class InitSettlementListUseCase {
  constructor(
    private readonly np: NovaPoshtaRepository,
    private readonly settlementRepo: SettlementRepository,
  ) {}

  async exec(): Promise<void> {
    await this.fetchAndSaveAllSettlement();
  }

  private async fetchAndSaveAllSettlement(): Promise<void> {
    let page = INIT_PAGE;

    while (true) {
      const result = await this.np.getSettlementList(page);

      for await (const settlement of result) {
        await this.settlementRepo.createSettlement(
          this.convertToLowerCase(settlement),
        );
      }

      if (!result.length) break;

      page++;
      await this.delay(500);
    }
  }

  private convertToLowerCase(
    settlementData: SettlementNovaPosthaIndex,
  ): SettlementEntity {
    const convertedSettle: any = {};
    for (const key in settlementData) {
      if (Object.prototype.hasOwnProperty.call(settlementData, key)) {
        const convertedKey = key.charAt(0).toLowerCase() + key.slice(1);
        convertedSettle[convertedKey as keyof SettlementEntity] =
          settlementData[key];
      }
    }
    return convertedSettle;
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
