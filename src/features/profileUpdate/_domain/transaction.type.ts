import { ProfileEntity } from "@/kernel/domain/profile/profile.type";
import { ProfileUpdateTxDTO } from "./types";

export abstract class IProfileUpdateTx {
  abstract update(dto: ProfileUpdateTxDTO): Promise<ProfileEntity>;
}
