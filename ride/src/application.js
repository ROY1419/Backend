
import express, { json, urlencoded } from 'express';
const application = express();
import cookieParser from 'cookie-parser';
import rideRoutes from '../src/router/ride.route.js'
// import { connect as _connect } from './service/rabbit';
import rabbit from './service/rabbit.js';
import dotenv from 'dotenv'


dotenv.config({
    path:'./.env'
})
rabbit.connect()
application.use(json());
application.use(urlencoded({ extended: true }));
application.use(cookieParser());


application.use('/', rideRoutes);


export default application;