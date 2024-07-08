import dotenv from 'dotenv';
import * as process from "process";
dotenv.config();

const Config: any = {};

// App
Config.APP_PORT = process.env.APP_PORT || 3000;
Config.APP_NAME = process.env.APP_NAME;
Config.APP_ENV = process.env.APP_ENV

// Database
Config.DB_HOST = process.env.DB_HOST;
Config.DB_PORT = process.env.DB_PORT;
Config.DB_NAME = process.env.DB_DATABASE;
Config.DB_USER = process.env.DB_USERNAME;
Config.DB_PASS = process.env.DB_PASSWORD;
Config.DB_DIALECT = process.env.DB_DIALECT;

// JWT
Config.JWT_SECRET = process.env.JWT_SECRET;


export default Config