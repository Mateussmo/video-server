import AppError from '../../../shared/errors/AppError';
import Rooms, { IRoomsInterface } from '../schemas/Rooms';

interface IRequestDTO {
  roomId: string;
}

class FindOneRoomsService {
  public async execute({ roomId }: IRequestDTO): Promise<IRoomsInterface> {
    const room = await Rooms.findById({ _id: roomId });

    if (!room) throw new AppError('This room does not exists!', 404);

    return room;
  }
}

export default FindOneRoomsService;
