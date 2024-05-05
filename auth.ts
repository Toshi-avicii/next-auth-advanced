import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log(session);
      return session;
    },
    async jwt({ token }) {
      if(!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if(!existingUser) {
        return token;
      }
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})