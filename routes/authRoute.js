import express from 'express';

import { getAllUsers, registerAccount } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post("/register-account",registerAccount);
authRoute.get("/get-all-users",getAllUsers);

export default authRoute;