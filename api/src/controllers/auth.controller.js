import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            // Basic validation, express-validator is better but keeping it simple/native for now
            return res.status(400).json({ success: false, error: 'Please provide all fields' });
        }

        const { user, token } = await authService.register({ username, email, password });

        res.status(201).json({
            success: true,
            data: {
                _id: user.id,
                username: user.username,
                email: user.email,
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }

        const { user, token } = await authService.login({ email, password });

        res.status(200).json({
            success: true,
            data: {
                _id: user.id,
                username: user.username,
                email: user.email,
                token
            }
        });
    } catch (error) {
        next(error);
    }
};
