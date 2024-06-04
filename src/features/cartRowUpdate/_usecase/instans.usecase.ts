import "reflect-metadata";
import cartRowChangeQuantityContainer from "../module";
import { ChangeQuantityCartRowUseCase } from "./cartRowChangeQuantity.usecase";

export const changeQuantityCartRowUseCase = cartRowChangeQuantityContainer.get(
  ChangeQuantityCartRowUseCase,
);
