import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";

// @injectable()
// export class InjectablePrismaClient extends PrismaClient {
//   constructor() {
//     super({
//       log: ["info"],
//     });
//   }
// }

@injectable()
export class PrismaClientProvider {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient({
      log: ["info"],
    });
  }

  getClient(): PrismaClient {
    return this.prismaClient;
  }
}
