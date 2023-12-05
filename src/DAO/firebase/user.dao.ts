import { collection, Firestore, getDocs } from "firebase/firestore";
import { User } from "../../schemas/user.schema";
import { IntializeFireBase } from "../../firebase.singleton";
@IntializeFireBase
export class UserDao {
	db: Firestore | any;

	async getCollection(): Promise<User[] | []> {
		const itemsCollection = collection(this.db, "test");
		const snapshot = await getDocs(itemsCollection);
		const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		console.log(data);
		return [];
	}

	addUser() {}

	removeUser() {}

	findUpdate() {}

	findbyId() {}
}
