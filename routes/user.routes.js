import express from "express";
const userRoutes = express.Router();
import { createUser, getUser, updateUser, deleteUser, loginUser, logoutUser } from "../controllers/user.controller";

userRoutes.post('/register', createUser);
userRoutes.get('/:id', getUser);
userRoutes.put('/update', updateUser);
userRoutes.delete('/remove', deleteUser);

userRoutes.post('/login', loginUser);
userRoutes.get('/logout', logoutUser);

export { userRoutes }