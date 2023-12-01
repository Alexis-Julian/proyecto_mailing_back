import { body } from "express-validator";
// import { NextFunction, Request, Response } from "express";

//No me gusta como queda
export default function UserDao(fields: string | string[]) {
	return [
		body([...fields])
			.notEmpty()
			.withMessage("Ningun campo puede estar vacio"),
	];
}
