import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { removeInputSchema } from "../_domain/validator.schema";
import { productSchema } from "@/entities/product/server";
import { ProductRemoveService } from "../_service/productRemove.service";

@injectable()
export class ProductRemoveController extends Controller {
  constructor(private readonly removeProductService: ProductRemoveService) {
    super();
  }

  public router = router({
    productRemove: {
      remove: publicProcedure
        .input(removeInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.removeProductService.execute(input);
          return productSchema.parse(result);
        }),
    },
  });
}
