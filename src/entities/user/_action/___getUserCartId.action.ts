"use server";
import { SessionSchema } from "@/shared/lib/session.theme";
import { z } from "zod";
import { userWithCartSchema } from "../_domain/user.schema";
import { UserWithCartEntity } from "../_domain/user.types";
import { getUserCartIdUseCase } from "../_useCase/__getUserCartId.usecase";

const propsSchema = z.object({
  session: SessionSchema,
  userId: z.string(),
});

const resultSchema = z.object({
  cartId: z.string(),
});

type ResultT = { user: UserWithCartEntity };

export const getUserCartIdAction = async (
  props: z.infer<typeof propsSchema>,
): Promise<ResultT> => {
  const { userId, session } = propsSchema.parse(props);

  // const session = await getAppSessionStrictServer();
  //
  const user = await getUserCartIdUseCase.exec({
    userId,
    session,
  });
  // console.log("output_log: %%%%%%%%%%%%%user =>>>", user);
  //
  // return resultSchema.parseAsync({
  //   user: user,
  // });
  return {
    user: {} as UserWithCartEntity,
  };
};
