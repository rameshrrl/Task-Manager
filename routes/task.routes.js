import express from "express";
const taskRoutes = express.Router();
import { createTask, getTask, updateTask, deleteTask } from "../controllers/task.controller";

taskRoutes.post('/create', createTask);
taskRoutes.get('/:id', getTask);
taskRoutes.put('/update', updateTask);
taskRoutes.delete('/remove', deleteTask);

export { taskRoutes };