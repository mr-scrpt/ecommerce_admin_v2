import cartRowRemoveContainer from "../module";
import { RemoveCartRowUseCase } from "./cartRowRemove.usecase";

export const removeCartRowUseCase =
  cartRowRemoveContainer.get(RemoveCartRowUseCase);
