import { z } from "zod";

const usersSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  name: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters." }),
  avatar: z.string(),
  datas: z
    .object({
      response: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
      cPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    })
    .refine(
      ({ password, cPassword }) => {
        return password === cPassword;
      },
      {
        message: "Password not match",
        path: ["datas.cPassword"],
      }
    ),
});

export const AuthSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Full name must be at least 4 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    cPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Password not match",
    path: ["cPassword"],
  });

export type TAuthSchema = z.infer<typeof AuthSchema>;
export type TUsersSchema = z.infer<typeof usersSchema>;
