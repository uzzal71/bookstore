import dotenv from 'dotenv';
import * as process from "process";
dotenv.config();

const Config: any = {};

// App
Config.APP_PORT = process.env.APP_PORT || 3000;
Config.APP_NAME = process.env.APP_NAME;

// Database
Config.DB_HOST = process.env.DB_HOST;
Config.DB_PORT = process.env.DB_PORT;
Config.DB_NAME = process.env.DB_DATABASE;
Config.DB_USER = process.env.DB_USERNAME;
Config.DB_PASS = process.env.DB_PASSWORD;
Config.DB_DIALECT = process.env.DB_DIALECT;

// Redis
Config.REDIS_USER = process.env.REDIS_USER;
Config.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
Config.REDIS_HOST = process.env.REDIS_HOST;
Config.REDIS_PORT = process.env.REDIS_PORT;

// AWS S3
Config.JWT_SECRET = process.env.JWT_SECRET;

Config.API_HOST = process.env.API_HOST
Config.APP_ENV = process.env.APP_ENV

/*
*  Start IDP Setup
* */
Config.SESSION_SECRET = process.env.SESSION_SECRET;


export default Config