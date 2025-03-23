import { DefaultUser } from "next-auth"

declare module 'next-auth' {
    interface User extends DefaultUser {
        id: number;
        username: string;
    }
    interface Session {
        user: User
    }
}