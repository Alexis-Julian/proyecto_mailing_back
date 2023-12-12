import bcrypt from "bcrypt";

export async function HashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export const decoargs = (password: string) =>
	function (value: any, context: any) {
		console.log(value, context, password);
	};
