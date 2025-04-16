import express from 'express';
import { signUpUser } from '../controller/SignUpUser.js';
import { loginUser } from '../controller/LoginUser.js';


const router = express.Router();
router.post('/signup', signUpUser);
router.post('/login', loginUser);

export default router;