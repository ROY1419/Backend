import Express from "express";
const app = Express()
import proxy from "express-http-proxy";

app.use('/stess-test', proxy('http://localhost:3001'));
app.use('/', proxy("http://localhost:3002"));  //port forwording link should be post here
app.listen(3000, () => {
    console.log('Gateway Service is runing on http://localhost:3000');
})