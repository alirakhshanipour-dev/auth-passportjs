import { UserModel } from "../models/user.model.js";
import Joi from "joi";
import HttpStatus from "http-status-codes"


import Joi from 'joi';
import { UserModel } from './path-to-your-model';

const userValidationSchema = Joi.object({
    fullName: Joi.string().required().min(3).max(50).trim(),
    username: Joi.string().required().min(3).max(30).trim(),
    email: Joi.string().email(),
    phone: Joi.string().allow(''),
    password: Joi.string()
        .required()
        .min(8) // Minimum password length
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')) // Complex password pattern
        .custom((value, helpers) => {
            // Check if the password contains at least one lowercase letter, one uppercase letter, one digit, and one special character
            if (
                /[a-z]/.test(value) &&
                /[A-Z]/.test(value) &&
                /\d/.test(value) &&
                /[!@#$%^&*]/.test(value)
            ) {
                return value;
            } else {
                return helpers.message(
                    'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
                );
            }
        }),
});


const validateUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: error.details[0].message });
    }
    next();
};

const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid user ID' });
    }
    next();
};

export { validateUser, validateUserId };
