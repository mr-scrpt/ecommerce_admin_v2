"use server";
import { initSettlementListUseCase } from "../_usecase/instans.usecase";

export const initSettlementListAction = async (): Promise<void> => {
  await initSettlementListUseCase.exec();
};
