import Jwt from "jsonwebtoken";
import { blacklistTokenModel } from "../models/blacklisttoken.model.js";
import { captainModel } from "../models/captain.model.js";

const captainAuth = async (res, req) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split('')[1];
        if (!token) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        const isBlacklisted = await blacklistTokenModel.findOne()
        if (isBlacklisted.length){
            return res.status(401).json({message:Unauthorised})
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id)
        if (!captain) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        req.captain = captain;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export default captainAuth;