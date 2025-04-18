import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/Users.js';
import dotenv from 'dotenv';
import { loginSchema } from '../../schema/validationUser/index.js';
dotenv.config();

export const loginUser = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign({
            userId: user.user_id,
            email: user.email,

        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
        return res.json({
            message: `Login successful for ${user.first_name} ${user.last_name}`,
            user: {
                id: user.user_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            },
            token
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
