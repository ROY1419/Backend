import { userModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { blacklistTokenModel } from '../models/blacklisttoken.model.js';

const register = async (res, req) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'user already exist' });
        };
        const hash = await bcrypt.hash(password, 8);
        const newUser = new userModel({ name, email, password: hash });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        res.send({token, newUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};
const login = async (res, req) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invaild Email and Password' });
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invaild Email and Password' });
        };
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        res.send({ message: 'User Login Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};
const logout = async (res, req) => {
    try {
        const token = req.cookies.token;
        await blacklistTokenModel.create({ token });
        res.clearCookie('token', token);
        res.send({ message: 'User Logout Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};
const profile = async (res, req) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

export{
    register,
    profile,
    login,
    logout
}