export { Login, Register };
import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/auth.service";
import { AuthLogin } from "../../DTO/auth-login.dto";
// import { HttpErrorConstructor } from "http-errors";

// Servicio para manipulara a los controladores
const ServiceUser = new UserService();

const Login = (req: Request, res: Response) => {
	const userLogin: AuthLogin = req.body;

	res.send(ServiceUser.AuthLogin(userLogin));
};

const Register = async (req: Request, res: Response, next: NextFunction) => {
	const userRegister = req.body;
	try {
		res.send(await ServiceUser.AuthRegister(userRegister));
	} catch (err) {
		next(err);
	}
};
