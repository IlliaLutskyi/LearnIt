import prisma from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password)
          throw new Error("Email and password are required");
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 5,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email && token.id && token.name && token.role) {
        session.user.id = token.id as number;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as "Admin" | "User";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
