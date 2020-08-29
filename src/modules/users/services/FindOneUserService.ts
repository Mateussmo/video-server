import AppError from '../../../shared/errors/AppError';
import Users from '../schemas/Users';

interface IUserInterface {
  id: string;
  username: string;
  mobileToken?: string;
}

interface IRequestDTO {
  username: string;
}

class ListAllUsersService {
  public async execute({ username }: IRequestDTO): Promise<IUserInterface> {
    const user = await Users.findOne({ username });

    if (!user) throw new AppError('This user does not exists!', 404);

    return user;
  }
}

export default ListAllUsersService;
