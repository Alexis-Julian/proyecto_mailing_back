import {
	addDoc,
	deleteDoc,
	doc,
	collection,
	Firestore,
} from "firebase/firestore";
import { User } from "../../schemas/user.schema";
import { IntializeFireBase } from "../../firebase.singleton";
import { extractCollection, extractDocument } from "../../utils/utils.firebase";

// Sacar los any de cada funcion
//Las devoluciones del las funciones estan mal aplicadas

@IntializeFireBase
export class UserDao {
	db: Firestore | any;

	async getCollection(): Promise<User[] | [] | any> {
		try {
			const itemsCollection = collection(this.db, "user");
			return await extractCollection(itemsCollection);
		} catch {
			return null;
		}
	}

	async addUser(userCreate: any): Promise<User[] | [] | any> {
		try {
			const itemcolllection = collection(this.db, "user");
			return await addDoc(itemcolllection, userCreate);
		} catch {
			return null;
		}
	}

	async removeUser(id: string): Promise<User[] | [] | any> {
		try {
			return await deleteDoc(doc(this.db, "user", id));
		} catch {
			return null;
		}
	}

	findUpdate() {}

	async findbyEmail() {}

	async findbyId(id: string): Promise<User[] | [] | any> {
		try {
			const document = doc(this.db, "user", id);
			return await extractDocument(document);
		} catch {
			return null;
		}
	}
}
