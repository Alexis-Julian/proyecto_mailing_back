import admin from "firebase-admin";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./shares/constants";
import { getAuth } from "firebase/auth";

const credentials = require("../serviceAccountKey.json");

const app = initializeApp(firebaseConfig);

export const adminApp = admin.initializeApp({
	credential: admin.credential.cert(credentials),
});

export const db = getFirestore(); //FireStore

export const auth = getAuth(); //GetAuth
