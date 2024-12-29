import express, { RequestHandler } from 'express';
import moment from 'moment';
const app = express();

app.use(express.json());

const requestLoggerHandler:RequestHandler = (req, res, next) => {
    console.log(`${moment().format("MM/DD/YYYY HH:mm:ss")} : [${res.statusCode}] ${req.method} ${req.path}`);
    next();
};

app.use(requestLoggerHandler);

app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})