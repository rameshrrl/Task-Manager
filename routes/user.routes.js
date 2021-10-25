import express from "express";
const userRoutes = express.Router();
import { auth } from "../helpers/auth";
import { createUser, getUser, updateUser, deleteUser, loginUser, logoutUser } from "../controllers/user.controller";

userRoutes.post('/register', createUser);
userRoutes.get('/:id', auth, getUser);
userRoutes.put('/update', auth, updateUser);
userRoutes.delete('/remove', auth, deleteUser);

userRoutes.post('/login', loginUser);
userRoutes.get('/logout', auth, logoutUser);

export { userRoutes };