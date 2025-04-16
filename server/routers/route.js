import express from 'express';
import { signUpUser } from '../controller/AuthController/SignUpUser.js';
import { loginUser } from '../controller/AuthController/LoginUser.js';
import { getAllUserData, getUserData } from '../controller/GetUserData.js';
import { createBoard } from '../controller/BoardController/CreateBoard.js';
import { getAllBoards, getBoardByUserId } from '../controller/BoardController/GetBoard.js';
import { deleteBoard } from '../controller/BoardController/DeleteBoard.js';
import { updateBoard } from '../controller/BoardController/UpdateBoard.js';

const router = express.Router();
router.post('/signup', signUpUser);
router.post('/login', loginUser);

router.post('/board', createBoard);
router.get('/allboard/',getAllBoards );
router.get('/allboard/:user_id',getBoardByUserId );
router.delete('/board/:board_id', deleteBoard)
router.patch('/board/:board_id', updateBoard)

router.get('/userData/:user_id', getUserData);
router.get('/userData', getAllUserData);

export default router;