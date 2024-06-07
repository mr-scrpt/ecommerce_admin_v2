import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getBySettlementInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { PostOfficeListGetService } from "../_service/postOfficeListGet.service";

@injectable()
export class PostController extends Controller {
  constructor(
    private readonly getPostOfficeListService: PostOfficeListGetService,
  ) {
    super();
  }

  public router = router({
    post: {
      getOfficeListBySettlement: publicProcedure
        .input(getBySettlementInputSchema)
        .query(async ({ input }) => {
          const result = await this.getPostOfficeListService.execute(input);
          console.log("output_log: schema =>>>", getListOutputSchema);
          console.log("output_log: result =>>>", result);
          return getListOutputSchema.parse(result);
        }),
    },
  });
}
