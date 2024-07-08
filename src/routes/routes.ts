import express from 'express';
import AuthRoutes from '@Routes/Auth';
import AuthorRoutes from '@Routes/Author';
import BookRoutes from "@Routes/Book";


const routes = express.Router();


// set authorization routes
routes.use(AuthRoutes);
routes.use(AuthorRoutes);
routes.use(BookRoutes);

export default routes;