import base64 from "base64url";
import crypto from "crypto";
import fs from "fs";
const verifyFunction = crypto.createVerify("RSA-SHA256");

export function verifyToken(JWT: string | null): boolean {
    if (JWT === null) {
        return false
    }
    const PUB_KEY = fs.readFileSync(process.cwd() + "/app/auth/id_rsa_priv.pem", "utf8");
    const jwtHeader = JWT.split(".")[0];
    const jwtPayload = JWT.split(".")[1];
    console.log(jwtPayload);
    const jwtSignature = JWT.split(".")[2];
    verifyFunction.write(jwtHeader + "." + jwtPayload);
    verifyFunction.end();
    const jwtSignatureBase64 = base64.toBase64(jwtSignature);
    const signatureIsValid = verifyFunction.verify(
        PUB_KEY,
        jwtSignatureBase64,
        "base64"
    );
    console.log(signatureIsValid); // true
    return signatureIsValid;
}

