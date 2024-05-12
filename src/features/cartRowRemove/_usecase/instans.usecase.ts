import "reflect-metadata";
import cartRowChangeQuantityContainer from "../module";
import { RemoveCartRowUseCase } from "./cartRowRemove.usecase";

export const removeCartRowUseCase =
  cartRowChangeQuantityContainer.get(RemoveCartRowUseCase);
