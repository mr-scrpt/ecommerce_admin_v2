import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getBySettlementInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { PostOfficeListGetService } from "../_service/postOfficeListGetBySettlement.service";

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
          return getListOutputSchema.parse(result);
        }),
    },
  });
}
