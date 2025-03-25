'use client'
import {signOut} from "next-auth/react";

export default function SignOutButton() {
    return (
        <button className={"text-white border-white bg-blue-800 hover:bg-blue-700 p-2 rounded-lg"} onClick={() => signOut({callbackUrl: "/login"})}>
            Sign Out
        </button>
    )
}