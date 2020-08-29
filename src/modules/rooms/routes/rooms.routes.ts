import { Router } from 'express';
import ensuredAuthenticated from '../../../shared/middlewares/EnsureAuthenticated';
import RoomsController from '../controllers/RoomsController';
import CreateRoomValidation from '../middlewares/CreateRoomValidation';

const router = Router();
const roomController = new RoomsController();

router.post(
  '/',
  ensuredAuthenticated,
  CreateRoomValidation,
  roomController.store,
);

export default router;
