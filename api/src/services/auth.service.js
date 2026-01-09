import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';
import { ErrorResponse } from '../middleware/error.middleware.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async ({ username, email, password }) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new ErrorResponse('User already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
        username,
        email,
        password: hashedPassword,
    });

    return { user, token: generateToken(user._id) };
};

export const login = async ({ email, password }) => {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    return { user, token: generateToken(user._id) };
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn: '30d',
    });
};
