import express from "express";
import Middlewares from "./middlewares";
import Routes from "./routes";
import { PORT } from "./configuration";
import * as admin from "firebase-admin";
// import { firebaseConfig } from "./configuration";
/* import { a } from "./test";
a; */

const app = express();

const credentials = require("../serviceAccountKey.json");

// Utiliza el objeto serviceAccount

admin.initializeApp({ credential: admin.credential.cert(credentials) });

/* admin.auth().createUser({
  email: "probando1@gmail.com",
  password: "123456",
}); */

Middlewares(app); //MiddleWares

Routes(app);

app.listen(PORT, () => {
  console.log("Server listening PORT 8080");
});
