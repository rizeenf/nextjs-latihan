import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUsersAuth } from "./utils/fetchUsers";
import { TAuth } from "@/types/type";
import { compareSync } from "bcrypt-ts";

export const authOptions: NextAuthOptions = {
  secret: "mysecretcode",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const userData = await fetchUsersAuth();

        const foundUser = userData.find(
          (user: TAuth) => user.email === credentials?.email
        );

        if (foundUser) {
          const isPassMatch = compareSync(
            credentials?.password,
            foundUser.password
          );
          return isPassMatch ? foundUser : null;
        }

        return null;
      },
    }),
  ],
};
