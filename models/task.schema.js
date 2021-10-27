import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    user: {type : mongoose.ObjectId , ref: 'user'}
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('task', taskSchema, 'task')