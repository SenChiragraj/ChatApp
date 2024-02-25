import express from "express";
import isAuthenticated from '../middleware/isAuthenticated.js'
import { addFriend } from "../controller/FriendsController.js";

const route = express.Router();

route.post('/add', isAuthenticated, addFriend);

export default route;