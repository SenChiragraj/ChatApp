import express, { Router } from "express";
import { getAll, loginUser, registerUser } from "../controller/UserController.js";

const route = express.Router();

route.get('/all', getAll);
route.post('/login', loginUser);
route.post('/register', registerUser);

export default route;