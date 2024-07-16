import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { SettlementInitService } from "../_service/settlementInit.service";
import {
  getByRefInputSchema,
  getListOutputSchema,
  searchInputSchema,
} from "../_domain/validator.schema";
import { SettlementListSearchService } from "../_service/settlementListSearch.service";
import { SettlementAvailableListSearchService } from "../_service/settlementAvailableListSearch.service";
import { SettlementGetByRefService } from "../_service/settlementGet.service";
import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";

@injectable()
export class SettlementController extends Controller {
  constructor(
    private readonly initSettlementListService: SettlementInitService,
    private readonly getSettlementByRefService: SettlementGetByRefService,
    private readonly searchSettlementListService: SettlementListSearchService,
    private readonly searchSettlementAvailableListService: SettlementAvailableListSearchService,
  ) {
    super();
  }

  public router = router({
    settlement: {
      init: publicProcedure.query(async () => {
        await this.initSettlementListService.execute();
      }),
      getByRef: publicProcedure
        .input(getByRefInputSchema)
        .query(async ({ input }) => {
          const result = await this.getSettlementByRefService.execute(input);
          return settlementSchema.parse(result);
        }),
      search: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result = await this.searchSettlementListService.execute(input);

          return getListOutputSchema.parse(result);
        }),
      searchAvailable: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.searchSettlementAvailableListService.execute(input);

          return getListOutputSchema.parse(result);
        }),
    },
  });
}
