import { StaffEntity } from "@/kernel/domain/staff/staff.type";
import { IStaffRepository } from "@/kernel/domain/staff/repository.type";
import { injectable } from "inversify";

@injectable()
export class StaffListService {
  constructor(private readonly staffRepo: IStaffRepository) {}

  async execute(): Promise<Array<StaffEntity>> {
    return await this.staffRepo.getList();
  }
}
