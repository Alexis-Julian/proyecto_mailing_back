export { Login, Register };
import { Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
const Login = (req: Request, res: Response) => {
	console.log(validationResult(req));
	console.log(req.body);
	res.send("123");
};

const Register = () => {};
