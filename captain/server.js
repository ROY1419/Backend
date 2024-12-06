import { createServer } from 'http';
import application from './src/application.js'

const server = createServer(application)

server.listen(3002, () => {
    console.log('Captain service is runing on port 3002');
})