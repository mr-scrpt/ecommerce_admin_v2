import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getBySettlementRefInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { PostOfficeListGetBySettlementRefService } from "../_service/postOfficeListGetBySettlement.service";

@injectable()
export class PostController extends Controller {
  constructor(
    private readonly getPostOfficeListBySettlementRefService: PostOfficeListGetBySettlementRefService,
  ) {
    super();
  }

  public router = router({
    post: {
      getOfficeListBySettlementRef: publicProcedure
        .input(getBySettlementRefInputSchema)
        .query(async ({ input }) => {
          console.log("output_log: input =>>>", input);
          const result =
            await this.getPostOfficeListBySettlementRefService.execute(input);

          console.log("output_log: result====$$$$ =>>>", result);
          const res = getListOutputSchema.parse(result);
          console.log("output_log: RES =>>>", res);
          return res;
        }),
    },
  });
}
