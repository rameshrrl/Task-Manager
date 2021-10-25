import jwt from 'jsonwebtoken';

export const generateToken = async (email) => {
    return jwt.sign({ email: email}, process.env.SECRETKEY);
}