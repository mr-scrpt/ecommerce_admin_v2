import "reflect-metadata";
import cartAddContainer from "../module";

import { AddCartRowUseCase } from "./cartAdd.usecase";

export const addCartRowUseCase = cartAddContainer.get(AddCartRowUseCase);
