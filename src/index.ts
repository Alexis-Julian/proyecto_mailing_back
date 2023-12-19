import express from "express";
import Middlewares from "./middlewares";
import Routes from "./routes";
import { PORT } from "./configuration";
import * as admin from "firebase-admin";
// import { firebaseConfig } from "./configuration";
/* import { a } from "./test";
a; */

const app = express();

const serviceAccount = require("../serviceAccountKey.json");

// Utiliza el objeto serviceAccount

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://proyecto-email-3fc0f-default-rtdb.firebaseio.com",
});

const db = admin.database();

const ref = db.ref("/Probando");
const probando = async () => {
	/* const a = await ref.once("value");
	console.log(a); */

	// Ejemplo de escritura de datos
	await ref.set({ key: "value" });
};

probando();

Middlewares(app); //MiddleWares

Routes(app);

app.listen(PORT, () => {
	console.log("Server listening PORT 8080");
});
