import { PostOfficeNovaPoshtaIndex } from "@/kernel/lib/novaposhta/novaposhta.type";
import { PostOfficeEntity } from "./post.type";

export const convertPostToLowerCase = (
  settlementData: Partial<PostOfficeNovaPoshtaIndex>,
): PostOfficeEntity => {
  const convertedSettle: any = {};
  for (const key in settlementData) {
    if (Object.prototype.hasOwnProperty.call(settlementData, key)) {
      const convertedKey = key.charAt(0).toLowerCase() + key.slice(1);
      convertedSettle[convertedKey as keyof PostOfficeEntity] =
        settlementData[key];
    }
  }
  return convertedSettle;
};
