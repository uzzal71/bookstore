import routes from "./routes"

const routeConfig = (app) => {
    app.use('/', routes)
}

export default routeConfig;