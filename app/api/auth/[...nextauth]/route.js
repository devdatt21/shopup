import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/ utils/db";
import User from "@/ models/User";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await db();
                } catch (error) {
                    console.error("Database connection failed:", error);
                    throw new Error("Database connection error");
                }

                const user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error("No user found");

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid Password");

                return { id: user._id, email: user.email };
            }
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.id = user.id;
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token?.id || null;
            return session;
        }
    },
    session: {
        maxAge: 60 * 15
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
