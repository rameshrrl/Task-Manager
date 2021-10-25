import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phone: {
        code: {
            type: String,
            require: true
        },
        number: {
            type: String,
            require: true
        }
    },
    email: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: false,
        default: true
    },
    lastLogin: {
        type: Date,
        require: false,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
})

export const user =  mongoose.model('user', userSchema, 'user');