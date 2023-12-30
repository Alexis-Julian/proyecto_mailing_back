import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../shares/constants";
import "dotenv/config";
import { UserObject } from "../middlewares/verifyToken";
export function createToken(
	payload: any,
	expire: any
): Promise<string | undefined> {
	/* Expire : 1hs : 1h , 1day: 1d */
	return new Promise((resolve, reject) => {
		jwt.sign(payload, JWT, { expiresIn: expire }, (e, token) => {
			if (e) reject(e);
			resolve(token);
		});
	});
}

export function validateToken(
	token: string
): Promise<JwtPayload | string | undefined> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT, (e, token) => {
			if (e) reject(e);
			resolve(token);
		});
	});
}

const firebaseProjectId = process.env.APPID_FIREBASE;
// const token = "tu-token-jwt";

export async function getFirebasePublicKeys() {
	console.log(firebaseProjectId, "esta es la key");
	const jwksUrl = `https://www.googleapis.com/service_accounts/v1/jwk/firebase-auth@${firebaseProjectId}.iam.gserviceaccount.com`;

	try {
		const response = await fetch(jwksUrl, {
			method: "GET",
		});
		console.log(response);
		// return response.data.keys;
	} catch (err) {
		console.error("Error obteniendo claves públicas JWKS:");
	}
}

/* async function validateFirebaseToken(token) {
	try {
		const publicKeys = await getFirebasePublicKeys();

		const decodedToken = jwt.decode(token, { complete: true });

		if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
			throw new Error(
				"Token no válido: no se pudo decodificar el encabezado o falta el ID de clave."
			);
		}

		const kid = decodedToken.header.kid;
		const publicKey = publicKeys.find((key) => key.kid === kid);

		if (!publicKey) {
			throw new Error(
				`No se encontró la clave pública correspondiente al ID de clave '${kid}'.`
			);
		}

		const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

		console.log("Token válido:", decoded);
		return decoded;
	} catch (error) {
		console.error("Error validando token:", error.message);
		throw error;
	}
} */
