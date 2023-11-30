import { initializeApp } from "firebase/app";
import { firebaseConfig as Config } from "./configuration";
import { red, green } from "console-log-colors";

export default class FirebaseSingleton {
	static #instance: any;
	constructor() {
		const app = initializeApp(Config);
		app;
	}

	static getIntance() {
		if (this.#instance) {
			console.log(red("Already connected DB"));
			return this.#instance;
		}
		this.#instance = new FirebaseSingleton();

		console.log(green("Connected"));

		return this.#instance;
	}
}
