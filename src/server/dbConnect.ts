import { ApiError } from "../app/http/utility/errorHandler";
import sequelize from "../config/database";

const connect = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
    } catch (error) {
        console.log(error)
        throw new ApiError('DB_CONNECT_ERROR', 503, '[Connection Error] Unable to connect Database. Kindly Check Envr')
    }
};
export default connect;