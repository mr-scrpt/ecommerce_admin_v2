import { PostOfficeNovaPoshta, SettlementNovaPoshta } from "./novaposhta.type";

export abstract class INovaPoshtaRepository {
  abstract getPostOffice(id: string): Promise<PostOfficeNovaPoshta>;
  abstract getPostOfficeListBySettlementRef(
    s: string,
  ): Promise<Array<PostOfficeNovaPoshta>>;

  abstract getSettlementListSearch(
    q: string,
  ): Promise<Array<SettlementNovaPoshta>>;

  abstract getSettlementList(p: number): Promise<Array<SettlementNovaPoshta>>;
}
