import { propertyRelationSchema } from "@/entities/property/_domain/property/property.schema";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { PropertyCreateService } from "../_service/propertyCreate.service";

@injectable()
export class PropertyCreateController extends Controller {
  constructor(private readonly createPropertyService: PropertyCreateService) {
    super();
  }

  public router = router({
    propertyCreate: {
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createPropertyService.execute(input);
          return propertyRelationSchema.parse(result);
        }),
    },
  });
}
