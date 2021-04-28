import { Router } from 'express';
import usersRouter from '../modules/users/routes/users.routes';
import roomRouter from '../modules/rooms/routes/rooms.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/rooms', roomRouter);

export default routes;
