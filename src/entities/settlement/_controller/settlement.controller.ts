import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { SettlementInitService } from "../_service/settlementInit.service";
import {
  getListOutputSchema,
  searchInputSchema,
} from "../_domain/validator.schema";
import { SettlementListSearchService } from "../_service/settlementListSearch.service";

@injectable()
export class SettlementController extends Controller {
  constructor(
    private readonly initSettlementListService: SettlementInitService,
    private readonly searchSettlementListService: SettlementListSearchService,
  ) {
    super();
  }

  public router = router({
    settlement: {
      init: publicProcedure.query(async () => {
        await this.initSettlementListService.execute();
      }),
      search: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result = await this.searchSettlementListService.execute(input);

          return getListOutputSchema.parse(result);
        }),
      // getList: publicProcedure.output(getListInputSchema).query(async () => {
      //   const result = await this.getSettlementListService.execute();
      //   return getListInputSchema.parse(result);
      // }),
    },
  });
}
