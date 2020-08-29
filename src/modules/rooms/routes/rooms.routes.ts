import { Router } from 'express';
import ensuredAuthenticated from '../../../shared/middlewares/EnsureAuthenticated';
import RoomsController from '../controllers/RoomsController';
import CreateRoomValidation from '../middlewares/CreateRoomValidation';
import UpdateHostValidation from '../middlewares/UpdateHostValidation';

const router = Router();
const roomController = new RoomsController();

router.post(
  '/',
  ensuredAuthenticated,
  CreateRoomValidation,
  roomController.store,
);

router.patch(
  '/:roomId',
  ensuredAuthenticated,
  UpdateHostValidation,
  roomController.updateHost,
);

export default router;
