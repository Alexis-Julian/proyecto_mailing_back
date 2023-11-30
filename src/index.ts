import express from "express";
import Middlewares from "./middlewares";
import Routes from "./routes";
import { PORT } from "./configuration";

const app = express();

Middlewares(app);

Routes(app);

app.listen(PORT, () => {
	console.log("Server listening PORT 8080");
});
