type Nicname = {
  name?: string | null;
  lastName?: string | null;
  email?: string;
  [key: string]: any; // для других возможных полей
};

export const nicknameGen = ({ name, lastName, email }: Nicname = {}): string =>
  [name && lastName && `${name} ${lastName}`, name, lastName, email, ""].find(
    Boolean,
  ) || "";
