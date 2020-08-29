import AppError from '../../../shared/errors/AppError';
import Rooms, { IRoomsInterface } from '../schemas/Rooms';
import Users from '../../users/schemas/Users';

interface IRequestDTO {
  name: string;
  capacity: number;
  userId: string;
}

class CreateRoomService {
  public async execute({
    name,
    capacity,
    userId,
  }: IRequestDTO): Promise<IRoomsInterface> {
    const user = await Users.findById(userId);

    if (!user) throw new AppError('This User does not exists!', 404);

    const room = await Rooms.create({
      name,
      capacity,
      hostUser: userId,
    });

    return room;
  }
}

export default CreateRoomService;
