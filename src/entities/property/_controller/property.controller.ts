import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { PropertyGetService } from "../_service/propertyGet.service";
import { propertySchema } from "../_domain/property/property.schema";
import { PropertyListGetService } from "../_service/propertyListGet.service";
import { PropertyGetWithRelationService } from "../_service/propertyWithRelationGet.service";
import { PropertyListWithRelationGetByService } from "../_service/propertyListGetWithRelationBy.service";

const propertyListSchema = z.array(propertySchema);
const getProperty = z.object({
  propertyId: z.string(),
});

const getPropertyListBySchema = z
  .object({
    categoryIdList: z.array(z.string()).optional(),
  })
  .refine((data) => data.categoryIdList, {
    message: "Either 'categoryIdList' or '...' is required",
  });

@injectable()
export class PropertyController extends Controller {
  constructor(
    private readonly getPropertyService: PropertyGetService,
    private readonly getPropertyWithRelationService: PropertyGetWithRelationService,
    private readonly getPropertyList: PropertyListGetService,
    private readonly getPropertyListWithRelationBy: PropertyListWithRelationGetByService,
  ) {
    super();
  }

  public router = router({
    property: {
      get: publicProcedure.input(getProperty).query(async ({ input }) => {
        const result = await this.getPropertyService.execute(input);
        return propertySchema.parse(result);
      }),
      getWithRelation: publicProcedure
        .input(getProperty)
        .query(async ({ input }) => {
          const result =
            await this.getPropertyWithRelationService.execute(input);
          return propertySchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getPropertyList.execute();
        return propertyListSchema.parse(result);
      }),
      getListBy: publicProcedure
        .input(getPropertyListBySchema)
        .query(async ({ input }) => {
          const result =
            await this.getPropertyListWithRelationBy.execute(input);
          return propertyListSchema.parse(result);
        }),
    },
  });
}
