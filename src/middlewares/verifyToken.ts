import { NextFunction, Request } from "express";
import { validateToken } from "../libs/jwt";
import createHttpError from "http-errors";

export interface UserObject {
	uid: string;
	emaiL: string;
	name: string;
	lastname: string;
}

export const verifyToken = async (
	req: Request,
	_res: any,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) throw createHttpError(401, "Token not valid");

	const response: any = await validateToken(token);

	req.headers.uid = response.uid;

	if (response) return next();
};
