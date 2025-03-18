import express from 'express';

import { getAllUsers, registerAccount, updateUser } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post("/register-account",registerAccount);
authRoute.get("/get-all-users",getAllUsers);
authRoute.put("/update-user/:id",updateUser);

export default authRoute;