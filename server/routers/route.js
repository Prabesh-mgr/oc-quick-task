import express from 'express';
import { signUpUser } from '../controller/SignUpUser.js';
import { loginUser } from '../controller/LoginUser.js';
import { getAllUserData, getUserData } from '../controller/GetUserData.js';

const router = express.Router();
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/userData/:user_id', getUserData);
router.get('/userData', getAllUserData);

export default router;