import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { SettlementInitService } from "../_service/settlementInit.service";

@injectable()
export class SettlementController extends Controller {
  constructor(
    private readonly SettlementListInitService: SettlementInitService,
  ) {
    super();
  }

  public router = router({
    settlement: {
      init: publicProcedure.query(async () => {
        await this.SettlementListInitService.execute();
      }),
      // getList: publicProcedure.output(getListInputSchema).query(async () => {
      //   const result = await this.getSettlementListService.execute();
      //   return getListInputSchema.parse(result);
      // }),
    },
  });
}
