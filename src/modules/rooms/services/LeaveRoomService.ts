import AppError from '../../../shared/errors/AppError';
import Rooms, { IRoomsInterface } from '../schemas/Rooms';

interface IRequestDTO {
  userId: string;
  roomId: string;
}

class LeaveRoomService {
  public async execute({
    userId,
    roomId,
  }: IRequestDTO): Promise<IRoomsInterface> {
    const room = await Rooms.findOne({ _id: roomId });

    if (!room) throw new AppError('This Room does not exists!', 404);

    if (!room.users?.includes(userId))
      throw new AppError('This user is not in this Room!', 400);

    const index = room.users.indexOf(userId);

    if (index > -1) {
      room.users?.splice(index, 1);
    }

    await room.save();

    return room;
  }
}

export default LeaveRoomService;
