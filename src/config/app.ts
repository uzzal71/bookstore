import express from 'express';
import cors from 'cors';
import ExceptionMiddleware from '../app/http/middleware/ExceptionMiddleware';
import HttpLoggerMiddleware from "@Middleware/HttpLoggerMiddleware";
// import { Request, Response } from "express";

const app = express();

app.use(ExceptionMiddleware);
app.use(HttpLoggerMiddleware);
// /*
// * Start IDP Setup
// * */
// app.use(session({
//     secret: Config.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: new session.MemoryStore()
// }));

// app.use(AuthService.middleware({
//     logout: '/logout',
//     admin: '/'
// }));

// /*
// * End IDP Setup
// * */


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