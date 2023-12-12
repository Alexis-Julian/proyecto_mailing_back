import { NextFunction, Request, Response } from "express";

interface ErrorProps {
	message: string;
	status: string;
	statusCode: string;
	expose: boolean;
	name: string;
}

export const errorHandler = (
	err: ErrorProps,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	const error = {
		message: err.message,
		status: err.status,
		name: err.name,
	};
	res.json(error);
};
