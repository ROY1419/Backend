import Jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const userAuth = async (res, req) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split('')[1];
        if (!token) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export default userAuth;