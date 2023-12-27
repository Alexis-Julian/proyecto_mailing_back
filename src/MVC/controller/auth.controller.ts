import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/auth.service";
import { AuthLogin } from "../../DTO/auth-login.dto";
// import { HttpErrorConstructor } from "http-errors";

// Servicio para manipulara a los controladores
const ServiceUser = new UserService();

export const Login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userLogin: AuthLogin = req.body;
	try {
		res.send(await ServiceUser.AuthLogin(userLogin));
	} catch (err) {
		next(err);
	}
};

export const Register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRegister = req.body;
	try {
		res.send(await ServiceUser.AuthRegister(userRegister));
	} catch (err) {
		next(err);
	}
};

export const validateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		const response = await ServiceUser.AuthToken(token);

		res.send(response);
	} catch (err) {
		next(err);
	}
};
