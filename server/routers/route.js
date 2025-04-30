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
import { getTaskDetails } from '../controller/TaskController/GetTaskDetails.js';
import { updateTaskColumn } from '../controller/TaskController/updateTaskColumns.js';

const router = express.Router();
router.post('/signup', signUpUser);
router.post('/login', loginUser);

router.post('/board',verifyToken, createBoard);
router.get('/user/boards',verifyToken, getBoardByUserId );
router.delete('/board/:boardId',verifyToken, deleteBoard)
router.patch('/board/:boardId',verifyToken, updateBoard)

router.post('/board/column/',verifyToken, createBoardColumn );
router.get('/board/column/:boardId',verifyToken, getBoardColumnsAndTasks);
router.route('/board/column/:columnId')
  .patch(verifyToken, updateBoardColumn)
  .delete(verifyToken, deleteBoardColumn);

router.get('/users/:userId',verifyToken, getUserData);
router.get('/users',verifyToken, getAllUsers);

router.get('/board/column/task/:taskId',verifyToken, getTaskDetails);
router.post('/board/column/task',verifyToken, createTasks);
router.patch('/board/task/:taskId/column', verifyToken, updateTaskColumn);
router.delete('/board/column/task/:taskId',verifyToken, deleteTasks);
router.patch('/board/column/task/:taskId',verifyToken, updateTasks);

export default router;