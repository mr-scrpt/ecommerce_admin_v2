import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { propertyRelationSchema } from "../_domain/property/property.schema";
import {
  getByCategoryInputSchema,
  getByCategoryListInputSchema,
  getInputSchema,
  getListOutputSchema,
  getListRelationOutputSchema,
} from "../_domain/property/validator.schema";
import { PropertyGetService } from "../_service/property/propertyGet.service";
import { PropertyListGetService } from "../_service/property/propertyListGet.service";
import { PropertyListGetWithRelationByCategoryListService } from "../_service/property/propertyListGetWithRelationByCategory.service";
import { PropertyGetWithRelationService } from "../_service/property/propertyWithRelationGet.service";
import { propertySchema } from "@/kernel/domain/property/property.schema";
import { PropertyListGetByCategoryService } from "../_service/property/propertyListGetByCategory.service";

@injectable()
export class PropertyController extends Controller {
  constructor(
    private readonly getPropertyService: PropertyGetService,
    private readonly getPropertyWithRelationService: PropertyGetWithRelationService,
    private readonly getPropertyList: PropertyListGetService,
    private readonly getPropertyListByCategory: PropertyListGetByCategoryService,
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
      getListByCategory: publicProcedure
        .input(getByCategoryInputSchema)
        .query(async ({ input }) => {
          const result = await this.getPropertyListByCategory.execute(input);
          return getListOutputSchema.parse(result);
        }),
      getListWithRelationByCategoryList: publicProcedure
        .input(getByCategoryListInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getPropertyListWithRelationByCategoryList.execute(input);
          const res = getListRelationOutputSchema.parse(result);
          return res;
        }),
    },
  });
}
