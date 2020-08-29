import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import CreateUserValidation from '../ middlewares/CreateUserValidation';

const router = Router();

const usersController = new UsersController();

router.post('/', CreateUserValidation, usersController.store);
router.post(
  '/authenticate',
  CreateUserValidation,
  usersController.authenticate,
);

export default router;
