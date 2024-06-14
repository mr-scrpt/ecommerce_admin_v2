import { injectable } from "inversify";
import { IOrderGenerateNumberService } from "../_domain/service.type";

@injectable()
export class OrderGenerateNumberService implements IOrderGenerateNumberService {
  execute(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}${month}${day}`;
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const randomNum = Math.floor(1000 + Math.random() * 9000);

    return `${dateString}-${randomNum}-${hours}${minutes}${seconds}`;
  }
}
