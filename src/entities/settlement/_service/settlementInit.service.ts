import { SettlementNovaPoshtaIndex } from "@/kernel/lib/novaposhta/novaposhta.type";
import { INovaPoshtaRepository } from "@/kernel/lib/novaposhta/repository.type";
import { injectable } from "inversify";
import { ISettlementRepository } from "../_domain/repository.type";
import { SettlementEntity } from "../_domain/settlement.type";

const INIT_PAGE = 1;
const INIT_DELAY = 250;

@injectable()
export class SettlementInitService {
  constructor(
    private readonly np: INovaPoshtaRepository,
    private readonly settlementRepo: ISettlementRepository,
  ) {}

  async execute(): Promise<void> {
    await this.fetchAndSaveAllSettlement();
  }

  private async fetchAndSaveAllSettlement(): Promise<void> {
    let page = INIT_PAGE;

    while (true) {
      const result = await this.np.getSettlementList(page);

      for await (const settlement of result) {
        await this.settlementRepo.create({
          data: this.convertToLowerCase(settlement),
        });
      }

      if (!result.length) break;

      console.log("output_log: parse novaposhta settlements: page =>>>", page);
      page++;
      await this.delay(INIT_DELAY);
    }
  }

  private convertToLowerCase(
    settlementData: SettlementNovaPoshtaIndex,
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
