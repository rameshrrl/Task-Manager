import Task from "../models/task.schema";
import { generateResponse } from "../helpers/response";

export const createTask = async (req, res) => {
    try {

        const { task } = req.body;
        const user = req.user;

        task.user = user._id;

        Task.create(task).then((createdTask) => {
            res.status(201).send(generateResponse('Task created successfully!', true, createdTask));
        }).catch(() => {
            res.status(400).send(generateResponse('Task creation failed!'));
        })

    } catch (error) {
        res.status(400).send(generateResponse('Error in creating a user!'));
    }
}

export const getTask = async (req, res) => {
    try {

        const { id } = req.params;
        const user = req.user;
        let { skip , limit } = req.query;

        skip = skip ? parseInt(skip) : 0;
        limit = limit ? parseInt(limit) : 10;

        if(id) {
            
            Task.findById(id).exec().then((fetchedTask) => {
                res.status(200).send(generateResponse('Task fetched successfully!', true, fetchedTask));
            }).catch(() => res.status(400).send(generateResponse('Task not found!')));
    
        } else {

            const count = await Task.find({user: user._id }).count();

            const fetchedTasks = await Task.find({user: user._id }).sort({createdAt : -1}).skip(skip).limit(limit).exec();

            if(!count) res.status(400).send(generateResponse('Tasks not found!'));

            let response = {
                count,
                tasks: fetchedTasks
            }
            
            res.status(200).send(generateResponse('Tasks fetched successfully!', true, response));
        }

    } catch (error) {
        res.status(400).send(generateResponse('Error in fetching task details!'));
    }
}

export const updateTask = async (req, res) => {
    try {
        const { task } = req.body;

        Task.findByIdAndUpdate({_id: task._id }, task, {new: true}).exec().then((updatedTask) => {
            res.status(200).send(generateResponse('Task updated successfully!', true, updatedTask));
        }).catch(() => res.status(400).send(generateResponse('Updating task details failed!')))
        
    } catch (error) {
        res.status(400).send(generateResponse('Error in updating task details!'));
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { ids } = req.body;

        if(Array.isArray(ids)) {

            Task.deleteMany({_id: { $in:ids } }).then(() => {
                res.status(200).send(generateResponse('Tasks deleted successfully!', true));
            }).catch(() => res.status(400).send(generateResponse('Deleting tasks failed!')));

        } else {

            Task.findOneAndDelete({_id: ids }).then(() => {
                res.status(200).send(generateResponse('Task deleted successfully!', true));
            }).catch(() => res.status(400).send(generateResponse('Deleting task details failed!')));

        }

    } catch (error) {
        res.status(400).send(generateResponse('Error in deleting task details!'));
    }    
}