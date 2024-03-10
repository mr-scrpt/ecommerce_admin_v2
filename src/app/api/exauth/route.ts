import { NextResponse } from "next/server";
import { registerUser } from "../../lib/auth"; // ваша функция для регистрации пользователя
import { signIn } from "next-auth/react";

export const POST = async (req: Request, res: any) => {
  const body = await req.json();
  // const response = await signIn("credentials", {
  //   username,
  //   password,
  //   redirect: false, // Отключите перенаправление, чтобы получить ответ
  // });
  const response = await signIn("Credentials", {
    username: body.username,
    password: body.password,
    redirect: false,
  });
  return NextResponse.json(body);
};

// export default async (req: any, res: any) => {
//   if (req.method === "POST") {
//     const { username, password } = req.body;
//
//     try {
//       const user = await registerUser({ username, password });
//
//       if (user) {
//         return res.status(200).json({ message: "Registration successful" });
//       }
//
//       return res.status(400).json({ message: "Registration failed" });
//     } catch (error) {
//       return res.status(500).json({ message: "Registration failed" });
//     }
//   }
//
//   res.setHeader("Allow", ["POST"]);
//   res.status(405).json({ message: `Method ${req.method} not allowed` });
// };
