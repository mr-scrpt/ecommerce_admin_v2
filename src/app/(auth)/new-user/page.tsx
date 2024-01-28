import { FC, HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const NewUserPage: FC<PageProps> = (props) => {
  return <div>New user Page</div>;
};

export default NewUserPage;
