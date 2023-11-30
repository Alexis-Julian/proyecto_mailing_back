import "dotenv/config";

export const PORT = 8080;

export const firebaseConfig = {
	apiKey: process.env.APIKEY_FIREBASE,
	authDomain: "proyecto-email-3fc0f.firebaseapp.com",
	projectId: "proyecto-email-3fc0f",
	storageBucket: "proyecto-email-3fc0f.appspot.com",
	messagingSenderId: "737092560040",
	appId: process.env.APPID_FIREBASE,
	measurementId: "G-YZRNX0GPZV",
};
