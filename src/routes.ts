import * as core from "express-serve-static-core";
import { app as Auth } from "./MVC/routes/auth.routes";
export default (app: core.Express) => {
	app.use("/api/auth", Auth);
};
