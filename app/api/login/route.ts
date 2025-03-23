import {db} from "@/app/lib/db";
import bcrypt from 'bcryptjs';

export interface luser {
    username: string;
    password: string;
    id: number;
}

export async function POST(req: Request) {
    const {username, password} = await req.json()

    const stmt = db.prepare(`SELECT * FROM usertable WHERE username = ?`);
    const checkDB= stmt.all(username)
    if (checkDB.length < 0) {
        return Response.json({err: "User does not exist.", success: false})
    }

    const myUser : luser = checkDB[0] as luser
    const checkUser = await bcrypt.compare(password as string, myUser.password);

    if (checkUser) {
        console.log("User verified Successfully.")
        return Response.json({err: `User verified successfully.`, success: true});
    }
    console.log("User verification failed.")
    return Response.json({err: `User verification failed.`, success: false});
}