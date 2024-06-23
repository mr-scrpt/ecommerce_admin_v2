import { UserUpdateDTO } from "@/entities/user/_domain/user.dto";
import { UserBase } from "@/kernel/domain/user/user.type";

type UserUpdatePayload = Partial<UserBase>;

export type UserUpdateTxPayload = {
  selector: UserUpdateSelector;
  userData: UserUpdatePayload;
};

export type UserUpdateTxDTO = {
  selector: UserUpdateSelector;
  userData: UserUpdateDTO["data"];
};

// NOTE: Selector
export type UserUpdateSelector = {
  id: string;
};
