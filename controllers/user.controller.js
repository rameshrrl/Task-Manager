import User from "../models/user.schema";
import { login } from "../services/user.service";
import bcrypt from "bcryptjs";
import { generateResponse } from "../helpers/response";

export const createUser = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) throw new Error();

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(user.password, salt);
        user.password = passwordHash;

        User.create(user).then(async (createdUser) => {

            login(createdUser).then((updatedUser) => {
                res.status(201).send(generateResponse('Registered successfully!', true, updatedUser));
            }).catch(() => {throw new Error()})

        }).catch((err) => {
            res.status(400).send(generateResponse('Registration failed!'));
        });

    } catch (error) {
        res.status(400).send(generateResponse('Error in registering a user!'));
    }   
}

export const getUser = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const updateUser = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteUser = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = User.findOne({email: email});

        if (!user) throw new Error();

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            return res.status(401).send(generateResponse('Invalid login credentials'));
        }

        await login(user).then((updatedUser) => {
            res.status(201).send(generateResponse('Logged in successfully!', true, updatedUser));
        }).catch((err) => {
            throw new Error();
        })

    } catch (error) {
        res.status(400).send(generateResponse('Error in Login!'));
    }
}

export const logoutUser = async () => {
    try {
        
    } catch (error) {
        
    }
}