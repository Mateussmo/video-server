import AppError from '../../../shared/errors/AppError';
import Rooms, { IRoomsInterface } from '../schemas/Rooms';

interface IRequestDTO {
  userId: string;
  roomId: string;
}

class JoinRoomService {
  public async execute({
    userId,
    roomId,
  }: IRequestDTO): Promise<IRoomsInterface> {
    const room = await Rooms.findOne({ _id: roomId });

    // TODO: Utilizar o limite da sala da capacidade

    if (!room) throw new AppError('This Room does not exists!', 404);

    if (room.users?.includes(userId))
      throw new AppError('This user is Already in this Room!', 409);

    room.users?.push(userId);

    await room.save();

    return room;
  }
}

export default JoinRoomService;
