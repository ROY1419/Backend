import express  from "express";
import { createRide } from "../controllers/ride.controller.js";
import userAuth from "../middleware/auth.middleware.js";
const router = express.Router()


router.post('/create-ride', userAuth, createRide)


export default router