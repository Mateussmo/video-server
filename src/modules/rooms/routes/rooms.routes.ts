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

router.patch('/:roomId/join', ensuredAuthenticated, roomController.join);

router.patch('/:roomId/leave', ensuredAuthenticated, roomController.leave);

export default router;
