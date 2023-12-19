import { Request, Response } from "express";

import serviceEmail from "../service/email.service";

const emailService = new serviceEmail();
emailService;
export const modifyEmail = (req: Request, res: Response) => {
	req;
	res.send("Probando");
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
