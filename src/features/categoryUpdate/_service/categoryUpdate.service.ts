import { Category } from "@/kernel/domain/category/category.type";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { IPropertyInvariant } from "@/kernel/domain/property/invariant.type";
import { ErrorApp } from "@/shared/error/error";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { Either, left, mergeInMany, right } from "@sweet-monads/either";
import { injectable } from "inversify";
import { merge } from "lodash";
import { ICategoryUpdateTx } from "../_domain/transaction.type";
import { CategoryUpdateTxPayload } from "../_domain/types";

@injectable()
export class CategoryUpdateService {
  constructor(
    private readonly categoryUpdateTx: ICategoryUpdateTx,
    // private readonly propertyInvariant: IPropertyInvariant,
    // private readonly categoryInvariant: ICategoryInvariant,
    readonly categoryRepo: ICategoryRepository,
  ) {}

  // errorList: ErrorApp[] = [];

  async execute(
    payload: CategoryUpdateTxPayload,
  ): Promise<Either<Array<ErrorApp>, Category>> {
    const cartRowUpdateDTO = this.build(payload);
    // const {
    //   selector,
    //   categoryData: { name },
    //   propertyData,
    // } = payload;

    // const invariantResultStage = await this.checkInvariantsStage(
    //   name,
    //   selector,
    //   propertyData,
    // );
    //
    // if (invariantResultStage.isLeft()) {
    //   return left(invariantResultStage.value);
    // }

    // return await this.performUpdate(cartRowUpdateDTO);
    const result = await this.categoryUpdateTx.update(cartRowUpdateDTO);
    // console.log("output_log: RESULT =>>>", result);

    return result;
  }

  // private async performUpdate(
  //   updateDTO: CategoryUpdateTxPayload,
  // ): Promise<Either<ErrorApp[], Category>> {
  //   const categoryUpdateResult = await this.categoryUpdateTx.update(updateDTO);
  //   return categoryUpdateResult.mapLeft((error) => [error]);
  // }

  private build(payload: CategoryUpdateTxPayload): CategoryUpdateTxPayload {
    const { categoryData } = payload;

    return merge({}, payload, {
      categoryData: {
        slug: slugGenerator(categoryData.name),
      },
    });
  }

  // private async checkInvariantsStage(
  //   name: string,
  //   selector: { id: string },
  //   propertyData: { propertyId: string }[],
  // ): Promise<Either<ErrorApp[], true>> {
  //   const invariantCheckResults = await Promise.all([
  //     this.categoryInvariant.isCategoryUniqueByName(name, selector),
  //     this.propertyInvariant.isPropertyListExist(
  //       propertyData.map(({ propertyId }) => propertyId),
  //     ),
  //   ]);
  //
  //   mergeInMany(invariantCheckResults).mapLeft((e) => (this.errorList = e));
  //   if (this.errorList.length > 0) {
  //     return left(this.errorList);
  //   }
  //
  //   return right(true);
  // }
}
