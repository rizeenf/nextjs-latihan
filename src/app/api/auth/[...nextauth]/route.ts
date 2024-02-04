import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: "mysecretcode",
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Email", type: "text" },
      },
      async authorize(credentials, req) {
        const user = { email: "jsmith@example.com", password: "12345678" };

        if (user) return user as any;

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
