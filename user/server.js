import { createServer } from 'http';
import application from './src/application.js'

const server = createServer(application)

server.listen(3001, () => {
    console.log('User service is runing on port 3001');
})