import AppError from '../../../shared/errors/AppError';
import Users from '../schemas/Users';

interface IUserInterface {
  id: string;
  email: string;
}

interface IRequestDTO {
  email: string;
}

class FindOneUsersService {
  public async execute({ email }: IRequestDTO): Promise<IUserInterface> {
    const user = await Users.findOne({ email });

    if (!user) throw new AppError('This user does not exists!', 404);

    return user;
  }
}

export default FindOneUsersService;
