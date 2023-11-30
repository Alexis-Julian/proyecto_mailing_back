import express from "express";

export const app = express.Router();

app.get("/auth", (_, res) => {
	res.send("estas en auth");
});
