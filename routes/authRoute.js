import express from 'express';

import { registerAccount } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post("/register-account",registerAccount);

export default authRoute;