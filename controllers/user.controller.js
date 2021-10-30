import User from "../models/user.schema";
import bcrypt from "bcryptjs";
import { generateResponse } from "../helpers/response";
import { generateToken } from "../helpers/generateToken";

export const createUser = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) throw new Error();

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(user.password, salt);
        user.password = passwordHash;

        user.token = await generateToken(user.email);

        User.create(user).then(async (createdUser) => {
            res.status(201).send(generateResponse('Registered successfully!', true, createdUser));
        }).catch((err) => {
            res.status(400).send(generateResponse('Registration failed!'));
        });

    } catch (error) {
        res.status(400).send(generateResponse('Error in registering a user!'));
    }   
}

export const getUser = async (req, res) => {
    try {

        const user = req.user;
        res.status(200).send(generateResponse('User details fetched!', true, user));

    } catch (error) {
        res.status(400).send(generateResponse('Error in fetching user details!'));
    }
}

export const updateUser = async (req, res) => {
    try {
        const { user } = req.body;

        const currentUser = req.user;

        if(user.email !== currentUser.email) {
            user.token = await generateToken(user.email);
        }

        User.findOneAndUpdate({ email: currentUser.email }, user, { new: true }).select({password: 0}).then((updatedUser) => {
            res.status(200).send(generateResponse('Updated successfully!', true, updatedUser));
        }).catch(() => {
            res.status(400).send(generateResponse('Updating user details failed!'));
        })

    } catch (error) {
        res.status(400).send(generateResponse('Error in updating user details!'));
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = req.user;

        User.findOneAndDelete({email: user.email}).then(() => {
            res.status(200).send(generateResponse('Deleted successfully!', true));
        }).catch(() => res.status(400).send(generateResponse('Deleting user details failed!')));

    } catch (error) {
        res.status(400).send(generateResponse('Error in deleting user details!'));
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email}).exec();

        if (!user) throw new Error();

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            return res.status(400).send(generateResponse('Invalid login credentials'));
        }

        user.token = await generateToken(user.email);
        User.findOneAndUpdate({ email: user.email }, user, {new: true}).select({password: 0}).then((updatedUser) => {
            res.status(200).send(generateResponse('Logged in successfully!', true, updatedUser));
        }).catch((err) => {throw new Error()});

    } catch (error) {
        res.status(400).send(generateResponse('Error in Login!'));
    }
}

export const logoutUser = async (req, res) => {
    try {
        const user = req.user;

        user.token = null;
        user.lastLogin = new Date();
        User.findOneAndUpdate({ email: user.email }, user, {new: true}).select({password: 0}).then((loggedOut) => {
            res.status(200).send(generateResponse('Logged out successfully!', true, loggedOut));
        }).catch((err) => {throw new Error()});

    } catch (error) {
        res.status(400).send(generateResponse('Error in Logout!'));
    }
}