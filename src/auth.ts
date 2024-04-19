import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Github],
  // callbacks: {
  //   // usually not needed, but here fixing a bug in next-auth.js
  //   async session({ session, user }: any) {
  //     if (session && user) {
  //       session.user.id = user.id;
  //     }

  //     return session;
  //   },
  // },
});
