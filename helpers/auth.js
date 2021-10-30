import User from "../models/user.schema";
import jwt from "jsonwebtoken";
import { generateResponse } from "../helpers/response";

export const auth = async (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const user = await User.findOne({email: decoded.email, token: token}).select({password: 0});
        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send(generateResponse('Please authenticate!'));
    }
}