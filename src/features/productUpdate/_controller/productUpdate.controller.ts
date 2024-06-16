import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { productSchema } from "@/entities/product/server";
import { ProductUpdateService } from "../_service/productUpdate.service";
import { updateInputSchema } from "../_domain/validator.schema";

@injectable()
export class ProductUpdateController extends Controller {
  constructor(private readonly createProductService: ProductUpdateService) {
    super();
  }

  public router = router({
    productUpdate: {
      update: publicProcedure
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createProductService.execute(input);
          return productSchema.parse(result);
        }),
    },
  });
}
