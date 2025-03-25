import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, {NextAuthOptions} from "next-auth";
import {db} from "@/app/lib/db";
import bcrypt from "bcryptjs";

export interface luser {
    id: number;
    username: string;
    password: string;
    token: string;
}
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { },
                password: { }
            },
            async authorize(credentials) {
                const myUser: luser = db.prepare("SELECT * FROM usertable WHERE username=?").get(credentials?.username) as luser
                console.log("myUser: ", myUser)
                if (myUser === undefined) {
                    throw new Error("User not found")
                }

                const checkPassword = await bcrypt.compare(
                    credentials?.password || "",
                    myUser.password
                )
                console.log("myUser: ", myUser)
                console.log(checkPassword)
                if (checkPassword) {
                    return {
                        id: myUser.id,
                        username: myUser.username
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token}) {
            if (session.user) {
                session.user.id = token.id as number;
                session.user.username = token.username as string;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };