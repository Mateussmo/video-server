import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import CreateUserValidation from '../ middlewares/CreateUserValidation';
import ensuredAuthenticated from '../../../shared/middlewares/EnsureAuthenticated';

const router = Router();

const usersController = new UsersController();

router.post('/', CreateUserValidation, usersController.store);

router.post(
  '/authenticate',
  CreateUserValidation,
  usersController.authenticate,
);

router.patch('/', ensuredAuthenticated, usersController.update);

export default router;
