export const abc = 1;
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./shares/constants";
import { getFirestore } from "firebase/firestore";
import { Firestore } from "firebase/firestore";

export function IntializeFireBase<T extends { new (...args: any[]): {} }>(
	baseClass: T,
	_context: any
) {
	return class extends baseClass {
		db: Firestore;
		constructor(...args: any[]) {
			super(...args);
			initializeApp(firebaseConfig);
			this.db = getFirestore();
		}
	};
}
