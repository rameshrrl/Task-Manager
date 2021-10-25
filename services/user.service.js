import { generateToken } from "../helpers/generateToken";
import User from "../models/user.schema";

export const login = async (user) => {
    user.token = await generateToken(user.email);
    return await User.updateOne({ email: user.email }, user);
}