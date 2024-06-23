import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { PropertyRemoveService } from "../_service/propertyRemove.service";
import { removeInputSchema } from "../_domain/validator.schema";
import { propertySchema } from "@/kernel/domain/property/property.schema";

@injectable()
export class PropertyRemoveController extends Controller {
  constructor(private readonly createPropertyService: PropertyRemoveService) {
    super();
  }

  public router = router({
    propertyRemove: {
      remove: publicProcedure
        .input(removeInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createPropertyService.execute(input);
          return propertySchema.parse(result);
        }),
    },
  });
}
