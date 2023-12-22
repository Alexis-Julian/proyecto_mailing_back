import { Request, Response, NextFunction } from "express";
import * as createError from "http-errors";

import serviceEmail from "../service/email.service";

const emailService = new serviceEmail();

export const modifyEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.params;
	try {
		res.send(await emailService.modifyEmail(email));
	} catch (err) {
		err = new createError.NotFound("Email not found");

		next(err);
	}
};

export const getEmail = (req: Request, res: Response) => {
	console.log(req.session);
	res.send("Probando");
};

export const saveEmail = (req: Request, res: Response) => {
	req;
	res.send("Probando");
};

export const deleteEmail = (req: Request, res: Response) => {
	req;
	res.send("Probando");
};
