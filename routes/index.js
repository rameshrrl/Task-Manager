import express from 'express';
const router = express.Router();
import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routes";

router.use('/user', userRoutes)
router.use('/task', taskRoutes)