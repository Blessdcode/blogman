// import type { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@/lib/prisma";
// import { Adapter } from "next-auth/adapters";

// export const authOptions: NextAuthOptions = {
//   adapter: <Adapter>PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   pages: {
//     signIn: "/sign-in",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true,
// };
