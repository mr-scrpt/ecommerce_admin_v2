import slugify from "slugify";

const slugifyConfig = {
  remove: undefined,
  lower: true,
  strict: false,
  locale: "vi",
  trim: true,
};

export const slugGenerator = (str: string) => slugify(str, slugifyConfig);
