import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  getByPropertyInputSchema,
  getListOutputSchema,
} from "../_domain/propertyItem/validator.schema";
import { PropertyItemListGetByPropertyService } from "../_service/propertyItem/propertyItemListGetByProperty.service";

@injectable()
export class PropertyItemController extends Controller {
  constructor(
    private readonly getPropertyItemListByPropertyService: PropertyItemListGetByPropertyService,
  ) {
    super();
  }

  public router = router({
    propertyItem: {
      getListByProperty: publicProcedure
        .input(getByPropertyInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getPropertyItemListByPropertyService.execute(input);
          return getListOutputSchema.parse(result);
        }),
    },
  });
}
