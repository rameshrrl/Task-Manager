import express from 'express';
const router = express.Router();
import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routes";
import { auth } from "../helpers/auth";

router.use('/user', userRoutes)
router.use('/task', auth, taskRoutes)