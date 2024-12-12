import Express from "express";
import morgan from "morgan";
const app = Express()
app.use(morgan('dev'))

app.get('/', (req, res) => {
    for (let i = 0; i<1000000; i++) {

    }
    res.send('shubham')
})
app.get('/stress-test', (req, res) => {
    for (let i = 0; i<1000000; i++) {

    }
    res.send('shubham')
})

app.listen(3000, () => {
    console.log('Server is runing on http://localhost:3000');
})