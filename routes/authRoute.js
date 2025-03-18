import express from 'express';

import { getAllUsers, login, registerAccount, updateUser } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post("/register-account",registerAccount);
authRoute.get("/get-all-users",getAllUsers);
authRoute.put("/update-user/:id",updateUser);
authRoute.post("/login",login);

export default authRoute;