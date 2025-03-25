import {db} from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { username, password, token } = await req.json();
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const values = [username, passHash, token];
    let userExists = false;
    const stmt = db.prepare(`SELECT * FROM usertable WHERE username = ?`);
    const checkDB= stmt.all(username)
    if (checkDB.values().toArray().length > 0) {
        userExists = true;
    }
    if (userExists) {
        console.log(`User already exists`);
        return Response.json({err: userExists});
    }
    const stmt2 = db.prepare(`
    INSERT INTO usertable (username, password, token)
    VALUES (?, ?, ?)
    `);
    const response = stmt2.run(values);
    return Response.json({err: `User created successfully. ${response}`});
}
