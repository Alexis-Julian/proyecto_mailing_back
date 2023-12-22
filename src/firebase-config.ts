import * as admin from "firebase-admin";

const credentials = require("../serviceAccountKey.json");

export const firebase = admin.initializeApp({
	credential: admin.credential.cert(credentials),
});
