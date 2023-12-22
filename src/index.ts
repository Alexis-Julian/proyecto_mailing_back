import express from "express";
import Middlewares from "./middlewares";
import Routes from "./routes";
import { PORT } from "./configuration";
// import { firebaseConfig } from "./configuration";
/* import { a } from "./test";
a; */

const app = express();

// Utiliza el objeto serviceAccount

Middlewares(app); //MiddleWares

Routes(app);

app.listen(PORT, () => {
	console.log("Server listening PORT 8080");
});
