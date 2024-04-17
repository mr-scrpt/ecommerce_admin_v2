"use server";
import { initSettlementListUseCase } from "../_usecase/instans.usecase";

export const initSettlementListAction = async (): Promise<string> => {
  try {
    await initSettlementListUseCase.exec();
    return "ok";
  } catch (error) {
    return "error";
  }
};
