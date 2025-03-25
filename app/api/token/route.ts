import {db} from "@/app/lib/db";
getToken(new Request(JSON.stringify({username: "asdf@gmail.com"})))

export async function getToken(req: Request) {
    const { username } = await req.json();
    const stmt = db.prepare(`SELECT token FROM usertable WHERE username = ?`);
    const checkDB= stmt.all(username)
    let response = '';
    if (checkDB.values().toArray().length > 0) {
        response = checkDB[0] as string;
        console.log(response)
    }
    return Response.json({err: `User created successfully. ${response}`});
}
