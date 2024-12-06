import express from "express";
const app = express()
import expressProxy from "express-http-proxy";

app.use('/user',expressProxy('http://localhost:3001'));
app.use('/captain',expressProxy('http://localhost:3002'));
app.use('/ride',expressProxy('http://localhost:3003'));

app.listen(3000, () => {
    console.log('Gateway Service is runing on http://localhost:3000');
})