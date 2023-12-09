export { Login, Register };
import { Request, Response } from "express";
import { UserService } from "../service/auth.service";
import { AuthLogin } from "../../DTO/auth-login.dto";

// Servicio para manipulara a los controladores
const ServiceUser = new UserService();

const Login = (req: Request, res: Response) => {
	const userLogin: AuthLogin = req.body;

	res.send(ServiceUser.AuthLogin(userLogin));
};

const Register = (req: Request, res: Response) => {
	const userRegister = req.body;

	res.send(ServiceUser.AuthRegister(userRegister));
};
