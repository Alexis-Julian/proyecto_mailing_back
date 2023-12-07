import express from "express";
import { Login, Register } from "../controller/auth.controller";

export const app = express.Router();

app.post("/login", Login);

app.post("/register", Register);
