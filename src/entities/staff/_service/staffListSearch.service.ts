import { injectable } from "inversify";
import { StaffSearchSelector } from "../_domain/staff.type";
import { IStaffRepository } from "@/kernel/domain/staff/repository.type";
import { StaffEntity } from "@/kernel/domain/staff/staff.type";

@injectable()
export class StaffListSearchService {
  constructor(private readonly consumerRepo: IStaffRepository) {}

  async execute(selector: StaffSearchSelector): Promise<Array<StaffEntity>> {
    const { q } = selector;
    if (!q) {
      return [];
    }
    return await this.consumerRepo.searchList(selector);
  }
}
