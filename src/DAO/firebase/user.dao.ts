import {
	addDoc,
	deleteDoc,
	doc,
	collection,
	Firestore,
	query,
	where,
} from "firebase/firestore";
import { UserSchema } from "../../schemas/user.schema";
import { IntializeFireBase } from "../../firebase.singleton";
import { extractCollection, extractDocument } from "../../utils/utils.firebase";

// Sacar los any de cada funcion
//Las devoluciones del las funciones estan mal aplicadas

@IntializeFireBase
export class UserDao {
	db: Firestore | any;

	async getCollection(): Promise<UserSchema[] | [] | any> {
		try {
			const itemsCollection = collection(this.db, "user");
			return await extractCollection(itemsCollection);
		} catch {
			return null;
		}
	}

	async addUser(userCreate: any): Promise<UserSchema[] | [] | any> {
		try {
			const itemcolllection = collection(this.db, "user");
			return await addDoc(itemcolllection, userCreate);
		} catch {
			return null;
		}
	}

	async removeUser(id: string): Promise<UserSchema[] | [] | any> {
		try {
			return await deleteDoc(doc(this.db, "user", id));
		} catch {
			return null;
		}
	}

	findUpdate() {}

	async findbyEmail(email: string): Promise<UserSchema[] | any> {
		const filter = query(
			collection(this.db, "user"),
			where("email", "==", email)
		);
		return await extractCollection(filter);
	}

	async findbyId(id: string): Promise<UserSchema[] | [] | any> {
		try {
			const document = doc(this.db, "user", id);
			return await extractDocument(document);
		} catch {
			return null;
		}
	}
}
