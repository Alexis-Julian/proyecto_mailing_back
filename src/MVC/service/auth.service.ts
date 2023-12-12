import { DocumentReference } from "firebase/firestore";
import { UserDao as DaoUser } from "../../DAO/firebase/user.dao";
import { AuthLogin } from "../../DTO/auth-login.dto";
import { AuthRegister } from "../../DTO/auth-register.dto";
import { HashPassword } from "../../libs/bcrypt";
import * as createError from "http-errors";

const UserDao = new DaoUser();

export class UserService {
	async AuthLogin({ email, password }: AuthLogin): Promise<any> {
		console.log(password);
		const findEmail = await UserDao.findbyEmail(email);

		if (!findEmail) return null;
		//Seguir parte Bcrypt
	}

	async AuthRegister(RegisterObject: AuthRegister): Promise<any> {
		const user: Array<any> = await UserDao.findbyEmail(RegisterObject.email);

		if (user.length > 0) throw new createError.Conflict("User already created");

		const newUser = {
			...RegisterObject,
			password: await HashPassword(RegisterObject.password),
		};

		const response: DocumentReference = await UserDao.addUser(newUser);

		if (response) return "User created";

		throw new createError.InternalServerError("Error Syntax");
	}
}
