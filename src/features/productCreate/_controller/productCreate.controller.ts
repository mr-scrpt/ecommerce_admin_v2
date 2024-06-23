import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { ProductCreateService } from "../_service/productCreate.service";
import { productSchema } from "@/kernel/domain/product/product.schema";

@injectable()
export class ProductCreateController extends Controller {
  constructor(private readonly createProductService: ProductCreateService) {
    super();
  }

  public router = router({
    productCreate: {
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createProductService.execute(input);
          return productSchema.parse(result);
        }),
    },
  });
}
