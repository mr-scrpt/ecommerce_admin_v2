import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { SettlementInitService } from "../_service/settlementInit.service";
import {
  getByRefInputSchema,
  searchByRefInputSchema,
  searchByRefOutputSchema,
  searchInputSchema,
  searchListOutputSchema,
} from "../_domain/validator.schema";
import { SettlementListSearchService } from "../_service/settlementListSearch.service";
import { SettlementAvailableListSearchService } from "../_service/settlementAvailableListSearch.service";
import { SettlementGetByRefService } from "../_service/settlementGet.service";
import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";
import { SettlementSearchByRefService } from "../_service/settlementSearchByRef.service";

@injectable()
export class SettlementController extends Controller {
  constructor(
    private readonly initSettlementListService: SettlementInitService,
    private readonly getSettlementByRefService: SettlementGetByRefService,
    private readonly searchSettlementListService: SettlementListSearchService,
    private readonly searchSettlementAvailableListService: SettlementAvailableListSearchService,
    private readonly searchSettlementByRefService: SettlementSearchByRefService,
  ) {
    super();
  }

  public router = router({
    settlement: {
      init: publicProcedure.query(async () => {
        return await this.initSettlementListService.execute();
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

          return searchListOutputSchema.parse(result);
        }),
      searchByRef: publicProcedure
        .input(searchByRefInputSchema)
        .query(async ({ input }) => {
          const result = await this.searchSettlementByRefService.execute(input);
          return searchByRefOutputSchema.parse(result);
        }),

      searchAvailable: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.searchSettlementAvailableListService.execute(input);

          return searchListOutputSchema.parse(result);
        }),
    },
  });
}
