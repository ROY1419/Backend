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
const acceptRide = async (req, res) => {
    const {rideId} = req.params;
    const ride =  await rideModel.findById(rideId)
    if(!ride){
            return res.status(400).json({message : 'Ride Not found'})
    }
    ride.status = 'accepted';
    await ride.save();
    publishToQueue("ride-accepted", JSON.stringify(ride))
    res.send(ride);
}
export {createRide, acceptRide}