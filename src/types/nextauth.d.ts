import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User";
  }
  interface Token {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User";
  }
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      role: "Admin" | "User";
    };
  }
}
