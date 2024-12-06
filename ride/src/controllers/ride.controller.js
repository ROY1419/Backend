import { rideModel } from "../models/ride.model.js";
import { publishToQueue } from "../service/rabbit.js";

const createRide = async (res, req) => {
    const { pickup, destination } = req.body;

    const newRide = new rideModel.find({
        user: req.user._id,
        pickup, destination
    })
    await newRide.save();
    publishToQueue('new-ride', JSON.stringify(newRide));
    res.send(newRide);
}

export default createRide