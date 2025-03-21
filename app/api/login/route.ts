import {db} from "@/app/lib/db";
import bcrypt from 'bcryptjs';
import {createToken} from "@/app/api/login/createToken";
import {verifyToken} from "@/app/api/login/verifyToken";

export interface user {
    username: string;
    password: string;
    id: number;
}

export async function POST(req: Request) {
    const {username, password} = await req.json()
    const checkJWT = localStorage.getItem('token');
    if(checkJWT) {
        if(verifyToken(checkJWT)) {
            return Response.json({err: `User verified successfully.`, success: true});
        }
    }

    const stmt = db.prepare(`SELECT * FROM usertable WHERE username = ?`);
    const checkDB= stmt.all(username)
    if (checkDB.length < 0) {
        return Response.json({err: "User does not exist.", success: false})
    }

    const myUser : user = checkDB[0] as user
    const checkUser = await bcrypt.compare(password as string, myUser.password);

    if (checkUser) {
        console.log("User verified Successfully.")
        const newJWT = createToken(myUser)
        localStorage.setItem("token", newJWT)
        console.log(localStorage.getItem("token"))
        return Response.json({err: `User verified successfully.`, success: true});
    }
    console.log("User verification failed.")
    return Response.json({err: `User verification failed.`, success: false});
}