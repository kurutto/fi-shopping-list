import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma";
export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
    updateAge: 6 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === "signIn") {
        token.deleteConfirm = true;
        if (user) {
          token.sub = user.id;
          token.name = user.name;
          token.email = user.email;
          token.emailVerified = user.emailVerified ? user.emailVerified : null;
        }
        if (token) {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub as string },
          });
          if (dbUser) {
            token.emailVerified = dbUser.emailVerified;
          }
        }
        token.jat = Math.floor(Date.now() / 1000);
      }
      //update() が呼ばれたときの処理
      if (trigger === "update" && session) {
        if ("id" in session) {
          if (session.id === null || session.id === undefined) {
            delete token.sub;
          } else {
            token.sub = session.id;
          }
        }
        if ("name" in session) {
          if (session.name === null || session.name === undefined) {
            delete token.name;
          } else {
            token.name = session.name;
          }
        }
        if ("email" in session) {
          if (session.email === null || session.email === undefined) {
            delete token.email;
          } else {
            token.email = session.email;
          }
        }
        if ("fridgeId" in session) {
          if (session.fridgeId === null || session.fridgeId === undefined) {
            delete token.fridgeId;
          } else {
            token.fridgeId = session.fridgeId;
          }
        }
        if ("fridgeName" in session) {
          if (session.fridgeName === null || session.fridgeName === undefined) {
            delete token.fridgeName;
          } else {
            token.fridgeName = session.fridgeName;
          }
        }
        if ("deleteConfirm" in session) {
          if (
            session.deleteConfirm === null ||
            session.deleteConfirm === undefined
          ) {
            delete token.deleteConfirm;
          } else {
            token.deleteConfirm = session.deleteConfirm;
          }
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      if (!session.user) return session;
      session.user.id = token.sub ? token.sub : "";
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.emailVerified = token.emailVerified as Date | null;
      session.user.fridgeId = token.fridgeId as string;
      session.user.fridgeName = token.fridgeName as string;
      session.user.deleteConfirm = (token.deleteConfirm ?? true) as boolean;
      return session;
    },
  },
};
