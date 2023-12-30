export type ResponseHTTP<T> = {
	statusCode: number;
	message: string;
	data: T;
};
