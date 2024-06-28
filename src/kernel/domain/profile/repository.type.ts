import { ProfileEntity } from "@/kernel/domain/profile/profile.type";
import { Tx } from "@/shared/lib/db/db";
import { ProfileGetDTO, ProfileUpdateDTO } from "./profile.dto";

export abstract class IProfileRepository {
  abstract get(dto: ProfileGetDTO, db?: Tx): Promise<ProfileEntity>;

  abstract getList(db?: Tx): Promise<ProfileEntity[]>;

  abstract update(dto: ProfileUpdateDTO, db?: Tx): Promise<ProfileEntity>;
}
