import express from "express";
import Middlewares from "./middlewares";
import Routes from "./routes";
import { PORT } from "./configuration";

/* import { a } from "./test";
a; */

const app = express();

Middlewares(app); //MiddleWares

Routes(app);

app.listen(PORT, () => {
	console.log("Server listening PORT 8080");
});
