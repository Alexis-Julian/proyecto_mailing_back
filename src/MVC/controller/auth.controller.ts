export { Login, Register };
import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/auth.service";
import { AuthLogin } from "../../DTO/auth-login.dto";
// import { HttpErrorConstructor } from "http-errors";

// Servicio para manipulara a los controladores
const ServiceUser = new UserService();

const Login = async (req: Request, res: Response, next: NextFunction) => {
	const userLogin: AuthLogin = req.body;
	try {
		await ServiceUser.AuthLogin(userLogin);
		console.log(req.session);
		//req.session.user = { token: "1" };
		res.send("probando");
	} catch (err) {
		next(err);
	}
};

const Register = async (req: Request, res: Response, next: NextFunction) => {
	const userRegister = req.body;
	try {
		res.send(await ServiceUser.AuthRegister(userRegister));
	} catch (err) {
		next(err);
	}
};
