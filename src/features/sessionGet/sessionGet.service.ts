import { SessionWithDataPayload } from "@/kernel/session";
import { getNetworkClientCookie } from "@/kernel/session/coockieParser";
import { ISessionGetRelationService } from "@/kernel/lib/nextauth/type";
import { configPrivate } from "@/shared/config/private.config";
import { injectable } from "inversify";
import { Session } from "next-auth";
import { IUserRepository } from "@/kernel/domain/user/repository.type";
import { UserWithCartEntity } from "@/entities/user/_domain/user.types";

const { COUNTRY_DEFAULT } = configPrivate;

@injectable()
export class SessionGetRelationService implements ISessionGetRelationService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(payload: SessionWithDataPayload): Promise<Session> {
    const { session, userId } = payload;
    const user = await this.userRepo.getWithCart<UserWithCartEntity>({
      id: userId,
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
