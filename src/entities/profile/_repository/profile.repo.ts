import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ProfileEntity } from "@/kernel/domain/profile/profile.type";
import { IProfileRepository } from "@/kernel/domain/profile/repository.type";
import {
  ProfileGetDTO,
  ProfileUpdateDTO,
} from "@/kernel/domain/profile/profile.dto";

@injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: ProfileGetDTO, db: Tx = this.db): Promise<ProfileEntity> {
    const result = await db.user.findUniqueOrThrow({
      where: dto,
    });

    return result;
  }

  async getList(db: Tx = this.db): Promise<ProfileEntity[]> {
    return db.user.findMany({});
  }

  async update(
    dto: ProfileUpdateDTO,
    db: Tx = this.db,
  ): Promise<ProfileEntity> {
    const { selector, data } = dto;

    return await db.user.update({
      where: selector,
      data,
    });
  }
}
