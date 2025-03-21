import {user} from "@/app/api/login/route";
import base64url from 'base64url'
import crypto from "crypto"
import fs from "fs";
createToken({username: "asdf1@gmail.com", password: "....", id: 1})

export function createToken(userData: user) {
    const signatureFunction = crypto.createSign("RSA-SHA256");

    const headerObj = {
        alg: "RS256",
        typ: "JWT",
    };

    const payloadObj = {
        sub: userData.id,
        name: userData.username,
        iat: Date.now(),
    };

    const headerObjString = JSON.stringify(headerObj);
    const payloadObjString = JSON.stringify(payloadObj);

    const base64UH = base64url(headerObjString);
    const base64UP = base64url(payloadObjString);

    signatureFunction.write(base64UH + "." + base64UP);
    signatureFunction.end();
    const PRIV_KEY = fs.readFileSync(process.cwd() + "/app/auth/id_rsa_priv.pem", "utf8");
    const signatureBase64 = signatureFunction.sign(PRIV_KEY, "base64");
    const signatureBase64Url = base64url.fromBase64(signatureBase64);
    console.log(signatureBase64Url);
    console.log(base64UH);
    console.log(base64UP);
    const JWT = base64UH+base64UP+signatureBase64Url;
    return JWT
}