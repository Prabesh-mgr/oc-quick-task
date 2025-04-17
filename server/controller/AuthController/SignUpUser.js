import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/Users.js';
import dotenv from 'dotenv';
import userSchema from '../../schema/validationUser/index.js';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const signUpUser = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { first_name, last_name, email, password} = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password_hash: hashedPassword,
        });

        const token = jwt.sign(
            { user_id: newUser.user_id, email: newUser.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(201).json({
            message: "User registered successfully!",
            token,
        });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};