import Express from "express";
import captainRoutes from '../src/routes/captain.route.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connect from './db/dbStep.js'

const application = Express()
connect()
dotenv.config()
application.use(Express.json())
application.use(Express.urlencoded({ extended: true }))
application.use(cookieParser)
application.use('/', captainRoutes)


export default application