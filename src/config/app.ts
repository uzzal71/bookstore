import express from 'express';
import cors from 'cors';
import ExceptionMiddleware from '../app/http/middleware/ExceptionMiddleware';
import HttpLoggerMiddleware from "@Middleware/HttpLoggerMiddleware";

const app = express();

app.use(ExceptionMiddleware);
app.use(HttpLoggerMiddleware);


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

process.on("unhandledRejection", function (reason: any) {
    console.log("unhandledRejection " + (reason?.stack));
});

process.on('uncaughtException', error => {
    console.log("uncaughtException " + (error));
})

export default app;