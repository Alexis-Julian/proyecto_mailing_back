import { UserDao as DaoUser } from "../../DAO/firebase/user.dao";

const UserDao = new DaoUser();

export class UserService {
	async AuthLogin(_LoginObject: any): Promise<any> {
		return 1;
	}
	async AuthRegister(RegisterObject: any): Promise<any> {
		const data = await UserDao.addUser(RegisterObject);

		return data;
	}
}
