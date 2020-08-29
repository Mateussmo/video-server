import AppError from '../../../shared/errors/AppError';
import Rooms, { IRoomsInterface } from '../schemas/Rooms';

interface IRequestDTO {
  currentHost: string;
  newHost: string;
  userId: string;
  roomId: string;
}

class UpdateHostService {
  public async execute({
    currentHost,
    newHost,
    userId,
    roomId,
  }: IRequestDTO): Promise<IRoomsInterface> {
    if (currentHost !== userId)
      throw new AppError('Your are not the host of this Room', 403);

    const room = await Rooms.findOne({ _id: roomId, hostUser: currentHost });

    if (!room) throw new AppError('This room does not exists!', 404);

    room.hostUser = newHost;

    await room.save();

    return room;
  }
}

export default UpdateHostService;
