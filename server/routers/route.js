import express from 'express';
import { signUpUser } from '../controller/AuthController/SignUpUser.js';
import { loginUser } from '../controller/AuthController/LoginUser.js';
import { getAllUsers, getUserData } from '../controller/GetUserData.js';
import { createBoard } from '../controller/BoardController/CreateBoard.js';
import {  getBoardByUserId } from '../controller/BoardController/GetBoard.js';
import { deleteBoard } from '../controller/BoardController/DeleteBoard.js';
import { updateBoard } from '../controller/BoardController/UpdateBoard.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getBoardColumnsAndTasks } from '../controller/BoardColumns/GetColumn.js';
import { updateBoardColumn } from '../controller/BoardColumns/UpdateColumn.js';
import { deleteBoardColumn } from '../controller/BoardColumns/DeleteColumns.js';
import { createBoardColumn } from '../controller/BoardColumns/CreateColumn.js';
import { createTasks } from '../controller/TaskController/CreateTasks.js';
import { deleteTasks } from '../controller/TaskController/DeleteTasks.js';
import { updateTasks } from '../controller/TaskController/UpdateTasks.js';

const router = express.Router();
router.post('/signup', signUpUser);
router.post('/login', loginUser);

router.post('/board',verifyToken, createBoard);
router.get('/allboard/:user_id',verifyToken, getBoardByUserId );
router.delete('/board/:board_id',verifyToken, deleteBoard)
router.patch('/board/:board_id',verifyToken, updateBoard)

router.post('/board/column/',verifyToken, createBoardColumn );
router.get('/board/column/:board_id',verifyToken, getBoardColumnsAndTasks);
router.route('/board/column/:column_id')
  .patch(verifyToken, updateBoardColumn)
  .delete(verifyToken, deleteBoardColumn);

router.get('/userData/:user_id',verifyToken, getUserData);
router.get('/userData/', getAllUsers);

router.post('/board/column/task',verifyToken, createTasks);
router.delete('/board/column/task/:task_id',verifyToken, deleteTasks);
router.patch('/board/column/task/:task_id',verifyToken, updateTasks);

export default router;