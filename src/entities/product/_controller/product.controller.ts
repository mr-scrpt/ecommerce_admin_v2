import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import {
  productRelationSchema,
  productSchema,
} from "../_domain/product.schema";
import {
  getInputSchema,
  getListByIdListInputSchema,
  getListOutputSchema,
  searchInputSchema,
} from "../_domain/validator.schema";
import { ProductGetService } from "../_service/productGet.service";
import { ProductRelationGetService } from "../_service/productRelationGet.service";
import { ProductListGetService } from "../_service/productListGet.service";
import { ProductListGetByIdListService } from "../_service/productListGetByIdList.service";
import { ProductListSearchService } from "../_service/productListSearch.service";

@injectable()
export class ProductController extends Controller {
  constructor(
    private readonly getProductService: ProductGetService,
    private readonly getProductRelationService: ProductRelationGetService,
    private readonly getProductListService: ProductListGetService,
    private readonly getProductListByIdListService: ProductListGetByIdListService,
    private readonly searchProductListService: ProductListSearchService,
  ) {
    super();
  }

  public router = router({
    product: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getProductService.execute(input);

        return productSchema.parse(result);
      }),
      getRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getProductRelationService.execute(input);

          return productRelationSchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getProductListService.execute();

        return getListOutputSchema.parse(result);
      }),
      getListByIdList: publicProcedure
        .input(getListByIdListInputSchema)
        .query(async ({ input }) => {
          const result =
            await this.getProductListByIdListService.execute(input);

          return getListOutputSchema.parse(result);
        }),
      search: publicProcedure
        .input(searchInputSchema)
        .query(async ({ input }) => {
          const result = await this.searchProductListService.execute(input);

          return getListOutputSchema.parse(result);
        }),
    },
  });
}
