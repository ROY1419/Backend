import { captainModel } from '../models/captain.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { blacklistTokenModel } from '../models/blacklisttoken.model.js';
import { subscribeToQueue } from '../../../ride/src/service/rabbit.js';

const pendingRequests = [];

const register = async (res, req) => {
    try {
        const { name, email, password } = req.body;
        const captain = await captainModel.findOne({ email });
        if (captain) {
            return res.status(400).json({ message: 'captain already exist' });
        };
        const hash = await bcrypt.hash(password, 8);
        const newCaptain = new captainModel({ name, email, password: hash });
        await newCaptain.save();
        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        res.send({token, newCaptain});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};
const login = async (res, req) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invaild Email and Password' });
        };
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invaild Email and Password' });
        };
        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
        res.send(req.captain);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    };
};
const toggleAvailablity = async(res, req) => {
    try {
        const captain = await captainModel.findById(req.captain._id);
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send(captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const waitForNewRide = async(req, res) => {
    req.setTimeout(30000, () => {
        res.status(200).end()
    });
    pendingRequests.push(res);
}
subscribeToQueue("new-ride", (data) => {
    console.log(JSON.parse(data));
    pendingRequests.forEach(res => {
        res.json({data : rideData})
    });
    pendingRequests.length = 0;
});
export{
    register,
    profile,
    login,
    logout,
    toggleAvailablity,
    waitForNewRide
}