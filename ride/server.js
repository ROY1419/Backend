import connectDB from "./src/db/dbSetup.js";
import  application  from './src/application.js'

import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        application.listen(process.env.PORT, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    }).catch((err) => {
        console.log("MONGODB connection failed !!! ", err);
    });


// import { createServer } from 'http';
// import application from '../ride/src/application.js'

// const server = createServer(application);


// server.listen(3003, () => {
//     console.log('ride service is running on port 3003');
// })