// import { DocumentReference } from "firebase/firestore";
import { UserDao as DaoUser } from "../../DAO/firebase/user.dao";
import { AuthLogin } from "../../DTO/auth-login.dto";
import { AuthRegister } from "../../DTO/auth-register.dto";
import { ComparePassword, HashPassword } from "../../libs/bcrypt";
import * as createError from "http-errors";
import { createToken } from "../../libs/jwt";
import { DocumentReference } from "firebase/firestore";

const UserDao = new DaoUser();

export class UserService {
	async AuthLogin({ email, password }: AuthLogin): Promise<any> {
		const user = await UserDao.findbyEmail(email);

		if (!user) return null;

		const result = await ComparePassword(password, user[0].password);

		if (!result) throw new createError.Unauthorized("Passowrd wrong");

		const token = await createToken({ result }, "1h");

		return token;
	}

	async AuthRegister(RegisterObject: AuthRegister): Promise<any> {
		const user: Array<any> = await UserDao.findbyEmail(RegisterObject.email);

		if (user.length > 0) throw new createError.Conflict("User already created");

		const newUser = {
			...RegisterObject,
			password: await HashPassword(RegisterObject.password),
		};

		const response: DocumentReference = await UserDao.addUser(newUser);

		if (!response.id) return null;

		const token = createToken(RegisterObject, "1h");

		return token;
	}
}
