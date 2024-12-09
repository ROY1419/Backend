
import express, { json, urlencoded } from 'express';
const application = express();
import cookieParser from 'cookie-parser';
import rideRoutes from '../src/router/ride.route.js'


import dotenv from 'dotenv'
import { connect } from '../src/service/rabbit.js';


dotenv.config({
    path:'./.env'
})
connect()
application.use(json());
application.use(urlencoded({ extended: true }));
application.use(cookieParser());


application.use('/', rideRoutes);


export default application;