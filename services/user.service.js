import { generateToken } from "../helpers/generateToken";
import User from "../models/user.schema";

export const login = (user) => {
    return new Promise(async (resolve, reject) => {
        user.token = await generateToken(user.email);
        const updatedUsert = User.findOneAndUpdate({ email: user.email }, user, {new: true}).select({password: 0});
        if(updatedUsert) resolve(updatedUsert);
        reject();
    })
}