import bcrypt from "bcrypt";

export async function HashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export async function ComparePassword(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}
export const decoargs = (password: string) =>
	function (value: any, context: any) {
		console.log(value, context, password);
	};
