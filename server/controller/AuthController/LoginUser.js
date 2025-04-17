import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

export const loginUser = async (req, res) => {
    try {
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
        return res.json({message:"Login sucessfully", token });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
