import * as admin from "firebase-admin";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./configuration";

import { getAuth } from "firebase/auth";
const credentials = require("../serviceAccountKey.json");

export const firebase = admin.initializeApp({
	credential: admin.credential.cert(credentials),
});

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
