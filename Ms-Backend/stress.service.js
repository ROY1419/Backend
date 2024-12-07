import Express from "express";
const app = Express()
import morgan from "morgan";



if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is runing`);
    console.log(`Forking ${numCPUs} working`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (Worker, code, signal) => {
        console.log(`worker ${Worker.process.pid} died`);
        console.log(`Forking a new worker`);
        cluster.fork();
    });
} else {
    app.use(morgan('dev'))
    app.get('/', (req, res) => {
        for (let i = 0; i < 1000000; i++) {

        }
        res.send('shubham')
    })
    app.listen(3001, () => {
        console.log('Stress service is runing on http://localhost:3001');
    })
}
