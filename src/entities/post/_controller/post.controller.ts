import { postOfficeSchema } from "@/kernel/domain/post/post.schema";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getBySettlementRefInputSchema,
  getInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { PostOfficeGetService } from "../_service/postOfficeGet.service";
import { PostOfficeListGetBySettlementRefService } from "../_service/postOfficeListGetBySettlement.service";

@injectable()
export class PostController extends Controller {
  constructor(
    private readonly getPostOfficeService: PostOfficeGetService,
    private readonly getPostOfficeListBySettlementRefService: PostOfficeListGetBySettlementRefService,
  ) {
    super();
  }

  public router = router({
    post: {
      getOffice: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const res = await this.getPostOfficeService.execute(input);
          console.log("output_log: RES in =>>>", res);
          return res;
        }),
      getOfficeListBySettlementRef: publicProcedure
        .input(getBySettlementRefInputSchema)
        .query(async ({ input }) => {
          console.log("output_log: INPUT__POST =>>>", input);
          const result =
            await this.getPostOfficeListBySettlementRefService.execute(input);

          const res = getListOutputSchema.parse(result);
          return res;
          // return result;
        }),
    },
  });
}
