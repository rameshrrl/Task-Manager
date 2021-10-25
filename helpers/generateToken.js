import jwt from 'jsonwebtoken';
import { secretKey } from "../config/config.json";

export const generateToken = async (email) => {
    return jwt.sign({ email: email}, secretKey);
}