import userModel from "../models/userModel.js";

import 'dotenv/config';

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create jwt token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: 'User does not exist!',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Invalid credentials!',
            });
        }

        const token = createToken(user._id);

        return res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
}

// Register user
const registerUser = async (req, res) => {
    const {
        name,
        email,
        password,
    } = req.body;

    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({
                success: false,
                message: 'User already exists!',
            });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Please enter a valid email!',
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Please enter a strong password of at least 8 characters!',
            });
        }

        // Encrypt user password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: encryptedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        
        res.json({
            success: false,
            message: error.message,
        });
    }
}

export {
    loginUser,
    registerUser,
};