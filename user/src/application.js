import Express from "express";
import userRoutes from '../src/routes/user.route.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDB from './db/dbStep.js'

const application = Express()
connectDB()
dotenv.config()
application.use(Express.json())
application.use(Express.urlencoded({ extended: true }))
application.use(cookieParser)
application.use('/', userRoutes)


export default application