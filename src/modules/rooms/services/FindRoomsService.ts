import AppError from '../../../shared/errors/AppError';
import Rooms, { IRoomsInterface } from '../schemas/Rooms';
import Users from '../../users/schemas/Users';

interface IRequestDTO {
  username: string;
}

class FindRoomsService {
  public async execute({ username }: IRequestDTO): Promise<IRoomsInterface[]> {
    const user = await Users.findOne({ username });

    if (!user) throw new AppError('This is user does not exists!', 404);

    const room = await Rooms.find().where('users').in([user._id]);

    return room;
  }
}

export default FindRoomsService;
