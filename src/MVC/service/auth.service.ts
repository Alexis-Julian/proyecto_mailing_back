import { UserDao as DaoUser } from "../../DAO/firebase/user.dao";
import { AuthLogin } from "../../DTO/auth-login.dto";
const UserDao = new DaoUser();

export class UserService {
	async AuthLogin({ email, password }: AuthLogin): Promise<any> {
		console.log(password);
		const findEmail = await UserDao.findbyEmail(email);

		if (findEmail) return null;
	}
	async AuthRegister(RegisterObject: any): Promise<any> {
		const data = await UserDao.addUser(RegisterObject);

		return data;
	}
}
