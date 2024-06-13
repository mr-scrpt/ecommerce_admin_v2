import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  propertyRelationSchema,
  propertySchema,
} from "../_domain/property/property.schema";
import {
  getByCategoryListInputSchema,
  getInputSchema,
  getListOutputSchema,
  getListRelationOutputSchema,
} from "../_domain/property/validator.schema";
import { PropertyGetService } from "../_service/propertyGet.service";
import { PropertyListGetService } from "../_service/propertyListGet.service";
import { PropertyListGetWithRelationByCategoryListService } from "../_service/propertyListGetWithRelationByCategory.service";
import { PropertyGetWithRelationService } from "../_service/propertyWithRelationGet.service";

@injectable()
export class PropertyController extends Controller {
  constructor(
    private readonly getPropertyService: PropertyGetService,
    private readonly getPropertyWithRelationService: PropertyGetWithRelationService,
    private readonly getPropertyList: PropertyListGetService,
    private readonly getPropertyListWithRelationByCategoryList: PropertyListGetWithRelationByCategoryListService,
  ) {
    super();
  }

  public router = router({
    property: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getPropertyService.execute(input);
        return propertySchema.parse(result);
      }),
      getWithRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getPropertyWithRelationService.execute(input);
          return propertyRelationSchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getPropertyList.execute();
        return getListOutputSchema.parse(result);
      }),
      getListWithRelationByCategoryList: publicProcedure
        .input(getByCategoryListInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getPropertyListWithRelationByCategoryList.execute(input);
          return getListRelationOutputSchema.parse(result);
        }),
    },
  });
}
