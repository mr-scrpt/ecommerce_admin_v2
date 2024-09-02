import { injectable } from "inversify";
import { IOrderGenerateNumberService } from "../_domain/order/service.type";

@injectable()
export class OrderGenerateNumberService implements IOrderGenerateNumberService {
  execute(): string {
    const date = new Date();
    const [year, month, day, hours, minutes, seconds] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ].map((unit) => String(unit).padStart(2, "0"));

    const randomNum = Math.floor(10000 + Math.random() * 90000);

    return `${year}${month}${day}-${randomNum}-${hours}${minutes}${seconds}`;
  }
}
