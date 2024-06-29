import { StoreCreateDTO } from "@/kernel/domain/store/store.dto";
import { StoreBase } from "@/kernel/domain/store/store.type";

type StoreCreatePayload = StoreBase;

export type StoreCreateTxPayload = {
  storeData: StoreCreatePayload;
};

export type StoreCreateTxDTO = {
  storeData: StoreCreateDTO["data"];
};
