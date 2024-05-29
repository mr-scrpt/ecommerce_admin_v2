import { SessionWithDataPayload } from "@/entities/session";
import { getNetworkClientCookie } from "@/entities/session/coockieParser";
import { UserRepository } from "@/entities/user/user.server";
import { SessionGetRelationServiceAbstract } from "@/kernel/lib/nextauth/type";
import { configPrivate } from "@/shared/config/private.config";
import { injectable } from "inversify";
import { Session } from "next-auth";

const { COUNTRY_DEFAULT } = configPrivate;

@injectable()
export class SessionGetRelationService
  implements SessionGetRelationServiceAbstract
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute(payload: SessionWithDataPayload): Promise<Session> {
    const { session, userId } = payload;
    const user = await this.userRepo.getUserWithCart({
      userId,
    });

    const clientDataParsed = getNetworkClientCookie();

    const sessionWithRelation = {
      ...session,
      user: {
        ...session.user,
        id: user.id,
        cartId: user?.cart?.id ?? "",
        role: user.role,
      },
      clientNetworkData: clientDataParsed ?? {
        country_code: COUNTRY_DEFAULT,
      },
    };

    return sessionWithRelation;
  }
}
