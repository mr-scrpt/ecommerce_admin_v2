import { injectable } from "inversify";

@injectable()
export abstract class Service {
  abstract execute(...args: any[]): Promise<any>;
}
