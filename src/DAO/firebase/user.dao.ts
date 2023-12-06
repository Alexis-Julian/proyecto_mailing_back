import { doc, collection, Firestore } from "firebase/firestore";
import { User } from "../../schemas/user.schema";
import { IntializeFireBase } from "../../firebase.singleton";
import { extractCollection, extractDocument } from "../../utils/utils.firebase";

// Sacar los any de cada funcion

@IntializeFireBase
export class UserDao {
  db: Firestore | any;

  async getCollection(): Promise<User[] | [] | any> {
    const itemsCollection = collection(this.db, "test");
    return await extractCollection(itemsCollection);
  }

  addUser() {}

  removeUser() {}

  findUpdate() {}

  async findbyId(_id: string): Promise<User[] | [] | any> {
    const document = doc(this.db, "test", "probando");

    return await extractDocument(document);
  }
}
