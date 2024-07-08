import Config from "./config";
import formData from 'express-form-data';
import os from 'os';
import routeConfig from "./routes";
import app from "./config/app";
import connect from "./server/dbConnect";
import RouteNotFoundExceptionMiddleware from "@Middleware/RouteNotFoundExceptionMiddleware";


const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.get('/', (req, res) => {
    return res.status(200).json({
        statusCode: 200,
        message: `Server running on port ${Config.APP_PORT || 3305}`,
        baseUrl: `http://localhost:${Config.APP_PORT}`,
    });
});

routeConfig(app);
app.use(RouteNotFoundExceptionMiddleware);
connect().then(async () => {
    console.log('Database connected');
}).catch((err) => {
    console.log('\x1b[31m', err.message, "\x1b[0m");
});

app.listen(Config.APP_PORT || 3305, () => {
    console.log('\x1b[32m', `[Node Server Running] Server running on port ${Config.APP_PORT || 3305}`, '\x1b[0m')
})
