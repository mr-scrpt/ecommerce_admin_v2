import { propertySchema } from "@/entities/property/server";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { PropertyUpdateService } from "../_service/propertyUpdate.service";

@injectable()
export class PropertyUpdateController extends Controller {
  constructor(private readonly createPropertyService: PropertyUpdateService) {
    super();
  }

  public router = router({
    propertyUpdate: {
      update: publicProcedure
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          console.log("output_log:  =>>>", input);
          const result = await this.createPropertyService.execute(input);
          return propertySchema.parse(result);
        }),
    },
  });
}
