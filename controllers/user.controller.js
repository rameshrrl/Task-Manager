import User from "../models/user.schema";
import { login } from "../services/user.service";
import bcrypt from "bcryptjs";

let response = {
    status: false,
    message: '',
    response: null
}

export const createUser = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) throw new Error();

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(user.password, salt);
        user.password = passwordHash;

        User.create(user).then(async (createdUser) => {

            login(createdUser).then((updatedUser) => {
                response.status = true;
                response.message = 'Registered successfully!';
                response.response = updatedUser;
                res.status(201).send(response);
            }).catch(() => {throw new Error()})

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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = User.findOne({email: email});

        if (!user) throw new Error();

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            response.message = 'Invalid login credentials';
            response['response'];
            return res.status(401).send(response);
        }

        await login(user).then((updatedUser) => {
            response.status = true;
            response.message = 'Logged in successfully!';
            response.response = updatedUser;
            res.status(201).send(response);
        }).catch((err) => {
            throw new Error();
        })

    } catch (error) {
        console.log(error);
        res.status(400).send('Error in Login!');
    }
}

export const logoutUser = async () => {
    try {
        
    } catch (error) {
        
    }
}