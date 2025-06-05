import { UserType } from "@/types/types";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserType;
  }
  interface User extends UserType{}
}
