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

export const getEmail = async (req: Request, res: Response) => {
	const uid = req.headers.uid;

	res.send(await emailService.getEmail(uid));
};

export const saveEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const uid = req.headers.uid;
		const email = req.params.email;

		res.send(await emailService.saveEmail(uid, email));
	} catch (err) {
		next(err);
	}
};

export const deleteEmail = (req: Request, res: Response) => {
	req;
	res.send("Probando");
};
