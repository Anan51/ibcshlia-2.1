'use client';

import {useState} from "react";
import {redirect} from "next/navigation";
import {verifyToken} from "@/app/api/login/verifyToken";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');




    const handleLogin =
        async (e: React.FormEvent) => {
            e.preventDefault()
            console.log("Login", username, password)

            const response = await fetch(`api/login`, {
                method: "POST",
                body: JSON.stringify({username: username, password: password}),
            })
            console.log("Login: ", await response.json());
    }
    return (
        <div className={"bg-center justify-center justify-items-center bg-[color()] text-center grid grid-flow-row auto-rows-max grow min-w-full items-center place-content-center h-dvh bg-[url(Spiral-Calendar-Graphics-3771421-1.jpg)] bg-cover"}>
            <h1 className={"text-4xl mt-4 mb-4"}>Log In</h1>
            <div className={"border-4 border-gray-500 rounded-lg max-w-5xl"}>
                <form onSubmit={handleLogin}>
                    <h3 className={"text-xl"}> Username: </h3>
                    <input aria-label={"userNameInput"} value={username} className={"rounded enabled:hover:bg-sky-200 ml-2 mr-2 p-2 bg-sky-100"} onChange={(event) => setUsername(event.target.value)} />
                    <h3 className={"text-xl"}> Password: </h3>
                    <input aria-label={"passwordInput"} type={"password"} value={password} className={"rounded enabled:hover:bg-sky-200 ml-2 mr-2 mb-2 p-2 bg-sky-100"} onChange={(event) => setPassword(event.target.value)} />
                    <button type="submit" className={"mb-2 rounded-3xl bg-sky-300 hover:bg-sky-500 p-2 w-1/2"}> Submit </button>
                </form>
            </div>
        </div>
    );
}
