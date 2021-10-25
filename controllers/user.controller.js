import User from "../models/user.schema";
import { login } from "../services/user.service";

let response = {
    status: false,
    message: '',
    response: null
}

export const createUser = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) throw new Error();

        User.create(user).then(async (user) => {

            await login(user);
            response.status = true;
            response.message = 'Registered successfully!';
            response.response = user;

            res.status(201).send(response);

        }).catch((err) => {
            response.message = 'Registration failed!';
            res.status(400).send(response);
        });

    } catch (error) {
        res.status(400).send('Error in registering a user!');
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

export const loginUser = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const logoutUser = async () => {
    try {
        
    } catch (error) {
        
    }
}