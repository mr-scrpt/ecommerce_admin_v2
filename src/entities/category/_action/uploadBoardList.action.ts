"use server";
import { storageFile } from "@/shared/lib/storageFile";
import { z } from "zod";
import { BOARD_LIST_FILE_KEY } from "../_constant/formData.contstant";
import { BadRequestError } from "@/kernel/error/errors/error.common";
import { ERROR_APP_LAYER } from "@/shared/error/type";

const resultSchema = z.object({
  boardList: z.object({
    path: z.array(z.string()),
  }),
});

export const uploadBoardListAction = async (formData: FormData) => {
  const files = formData.getAll(BOARD_LIST_FILE_KEY);

  const fileListUploaded = [];

  for (const file of files) {
    if (!(file instanceof File)) {
      throw new BadRequestError({ layer: ERROR_APP_LAYER.SERVICE });
    }
    try {
      const storedFile = await storageFile.uploadImage(file, "CategoryBoard");
      fileListUploaded.push(storedFile);
    } catch (e) {
      console.log("output_log: error =>>>", e);
    }
  }

  return resultSchema.parse({
    boardList: {
      path: fileListUploaded.map((item) => item.path),
    },
  });
};
