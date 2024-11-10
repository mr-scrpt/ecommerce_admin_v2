"use server";
import { BadRequest } from "@/shared/lib/errors";
import { AVATAR_FILE_KEY } from "../_constant/avatar.constant";
import { z } from "zod";
import { storageFile } from "@/shared/lib/storageFile";
import { BadRequestError } from "@/kernel/error/errors/error.common";
import { ERROR_APP_LAYER } from "@/shared/error/type";

const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

type ResultT = { avatar: { path: string } };

export const uploadProfileAvatarAction = async (
  formData: FormData,
): Promise<ResultT> => {
  const file = formData.get(AVATAR_FILE_KEY);

  if (!(file instanceof File)) {
    throw new BadRequestError({ layer: ERROR_APP_LAYER.SERVICE });
  }

  const storedFile = await storageFile.uploadImage(file, "avatar");

  return resultSchema.parse({
    avatar: storedFile,
  });
};
