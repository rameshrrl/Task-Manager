import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        code: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true,
            unique: true
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    },
    lastLogin: {
        type: Date,
        required: false,
        default: null
    },
    token: {
        type: String,
        required: true,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('user', userSchema, 'user');