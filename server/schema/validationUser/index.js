import Joi from 'joi';

const userSchema = Joi.object({
    first_name: Joi.string()
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
            'string.pattern.base': "First Name should only contain letters (A-Z, a-z) and spaces.",
            'any.required': "First Name is required."
        }),
    last_name: Joi.string()
        .pattern(/^[A-Za-z\s]+$/)
        .required() 
        .messages({
            'string.pattern.base': "Last Name should only contain letters (A-Z, a-z) and spaces.",
            'any.required': "Last Name is required."
        }),
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'org', 'net', 'edu'] } })
        .required()
        .messages({
            'string.email': "Invalid email format. Email should contain '@' and end with '.com', '.org', '.net', or '.edu'.",
            'any.required': "Email is required."
        }),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.pattern.base': "Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character.",
            'any.required': "Password is required."
        })
});

export default userSchema;