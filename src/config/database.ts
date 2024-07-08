import { Sequelize } from "sequelize-typescript";
import Config from ".";
import AllModels from "@Models/index";

/**
 * Sequelize Config
 */
const sequelize: Sequelize = new Sequelize(
    Config.DB_NAME,
    Config.DB_USER,
    Config.DB_PASS,
    {
        host: Config.DB_HOST,
        port: Config.DB_PORT,
        dialect: Config.DB_DIALECT || 'postgres',
        logging: false,
        models: AllModels
    }
);

export default sequelize;