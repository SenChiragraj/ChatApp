import express, { Router } from "express";
import isAuthenticated from '../middleware/isAuthenticated.js'
import { updatePersonalChat } from "../controller/ChatController.js";

const route = express.Router();

route.post('/send', isAuthenticated, updatePersonalChat);

export default route;