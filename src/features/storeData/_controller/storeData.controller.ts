import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { consumerRelationSchema } from "@/entities/consumer/server";
import { StoreListWithSettlementService } from "../_service/storeListWithSettlement.service";
import { getBySettlementRefInputSchema } from "@/entities/store/server";

@injectable()
export class StoreDataCreateController extends Controller {
  constructor(
    private readonly getListWithSettlement: StoreListWithSettlementService,
  ) {
    super();
  }

  public router = router({
    storeData: {
      getListWithSettlement: publicProcedure
        .input(getBySettlementRefInputSchema)
        .query(async ({ input }) => {
          const result = await this.getListWithSettlement.execute(input);
          return consumerRelationSchema.parse(result);
        }),
    },
  });
}
