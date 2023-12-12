import * as core from "express-serve-static-core";
import { app as Auth } from "./MVC/routes/auth.routes";
import { errorHandler } from "./utils/error.handlers";
export default (app: core.Express) => {
	app.use("/api/auth", Auth);

	app.use(errorHandler);
};
