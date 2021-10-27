import express from 'express';
const applicationRouter = express.Router();
import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routes";
import { auth } from "../helpers/auth";

applicationRouter.use('/user', userRoutes);
applicationRouter.use('/task', auth, taskRoutes);

export { applicationRouter };